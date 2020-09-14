const fs = require('fs-extra')
const ftp = require('ftp')
const path = require('path')
const glob = require('glob')

const config = require('../config')
// 参考 https://github.com/jerry2359/ftp-upload/blob/master/lib/client.js

/**
 * 创建远程目录
 */
function mkdir(c, remotePath) {
  return new Promise((resolve, reject) => {
    c.mkdir(remotePath, true, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}
/**
 * 删除远程目录
 */
function rmdir(c, remotePath) {
  return new Promise((resolve, reject) => {
    c.rmdir(remotePath, true, err => {
      if (err) return reject(err)
      resolve(remotePath)
    })
  })
}

/**
 * 执行上传动作
 * @param {*} c  ftp 实例
 * @param {string} file 待上传文件
 * @param {string} remoteDestFile 远程文件地址
 * @param {string} remoteDestDir 远程文件 path 文件夹
 * @param {*} type 遇到同名文件处理方式 'skip': 跳过  'overwrite': 覆盖
 */
function upload(c, file, remoteDestFile, remoteDestDir, type = 'overwrite') {
  return new Promise((resolve, reject) => {

    function uploadFile() {
      mkdir(c, remoteDestDir)
        .then(() => {
          c.put(file, remoteDestFile, err => {
            if (err) return reject(`[ftp] put error: ${err} \n`)
            resolve()
          })
        })
        .catch(err => reject(`[ftp] mkdir error: ${err}`))
    }

    if (type === 'skip') {
      c.list(remoteDestFile, (err, list) => {
        if (err || list.length <= 0) uploadFile()
      })
    } else {
      uploadFile()
    }

  })

}

/**
 * 上传单个文件
 * @param {*} c ftp 实例
 * @param {*} filePath 文件地址
 * @param {*} localDir 上传的本地文件路径(文件夹)
 * @param {*} remoteDir 远程路径
 */
function uploadSingle(c, filePath, localDir, remoteDir) {
  // 将路径中的 \ 转换成 /
  let prettyLocalDir = localDir.replace(/\\/g, '/')
  // 本地文件地址映射为远程地址
  let remoteDestFile = filePath.replace(prettyLocalDir,  remoteDir)
  let remoteDestDir = path.dirname(filePath).replace(prettyLocalDir, remoteDir)
  return upload(c, filePath, remoteDestFile, remoteDestDir)

}

exports.uploadFiles = function(localPath, remotePath) {
  console.log('========== Ftp Upload ========= \n')
  const { host, port, user, password } = config.deploy.ftp
  return new Promise((resolve, reject) => {

    if (!fs.existsSync(localPath)) {
      return reject(`待部署文件不存在，请检查配置 kiva.config.js deploy.dir \n 当前路径：${localPath} \n`)
    }

    const files = glob.sync(path.resolve(localPath, '**/*.*'))
    console.log('==== will upload these files ===', files)

    console.log('connect ftp server \n')
    const client = new ftp()
    client.on('error', reject)

    const promises = files.map(file => {
      return uploadSingle(client, file, localPath, remotePath)
    })

    Promise.all(promises)
    .then(() => {
      console.log('========== upload success ========== \n')
      client.end()
      resolve()
    })
    .catch(reject)

    client.connect({ host, port, user, password })

  })
}
