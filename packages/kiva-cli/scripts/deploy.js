process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const spawn = require('../utils/spawn')
const kivaConfig = require('../config')
const ftp = require('../utils/ftp')


function deployGhPages(dir, rootDir) {
  return new Promise(async (resolve, reject) => {
    dir = path.resolve(process.cwd(), dir)
    rootDir = path.resolve(process.cwd(), rootDir)
    if (!fs.existsSync(dir)) {
      reject(`待部署文件不存在，请检查配置 kiva.config.js deploy.dir \n 当前路径：${dir}`)
    }


    console.log('=== deploy debug ===', dir, rootDir)

    return spawn('git', [
      'add',
      dir,
    ], { cwd: rootDir })
    .then(() => {
      return spawn('git', [
        'commit',
        '-m',
        'deploy site1',
      ], { cwd: rootDir })
    })
    .then(() => {
      // git subtree push 要求文件夹为相对路径，且需要在根路径执行
      dir = path.relative(rootDir, dir)
      console.log('=== deploy push ===', dir, rootDir)
      return spawn('git', [
        'subtree',
        'push',
        '--prefix',
        dir,
        'origin',
        'gh-pages',
      ], { cwd: rootDir })
    })
    .catch(reject)

  })

}

function deployFtp(localPath, remotePath) {
  return ftp.uploadFiles(localPath, remotePath)
}


async function deploy() {
  const { type, dir, rootDir, ftp } = kivaConfig.deploy
  console.log('start deploy', type)
  console.log()

  if (type === 'gh-pages') {
    return deployGhPages(dir, rootDir)
  } else if (type === 'ftp') {
    return deployFtp(path.resolve(process.cwd(), dir), ftp.remotePath)
  }

  throw new Error('unknown deploy type')
}

module.exports = function(...args) {
  return deploy(...args).then(res => {
    console.log('deploy success', res)
  }).catch(err => {
    console.error(chalk.red(`deploy error`, err))
    process.exit(1)
  })
}
