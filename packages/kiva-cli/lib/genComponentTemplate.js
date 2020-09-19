const chalk = require('chalk')
const ejs = require('ejs')
const fs = require('fs-extra')
const path = require('path')
const { isBinaryFileSync  } = require('isbinaryfile')
const debug = require('debug')('faiz:cli-generate')
const { logWithSpinner, stopSpinner } = require('../utils/spinner')
const writeFileTree = require('../utils/writeFileTree')

/**
 * Render template files into the virtual files tree object.
 *
 * @param {string | object | FileMiddleware} source -
 *   Can be one of:
 *   - relative path to a directory;
 *   - Object hash of { sourceTemplate: targetFile } mappings;
 *   - a custom file middleware function.
 * @param {object} [additionalData] - additional data available to templates.
 * @param {object} [ejsOptions] - options for ejs.
 *
 * 渲染 ejs 模板
 */
async function render(source, additionalData = {}, ejsOptions = {}) {
  let files = {}

  const glob = require('glob')
  const _files = glob.sync('**/*.*', { cwd: source })

  // debug('template files', _files)

  for (const rawPath of _files) {
    // 下划线开头的文件转为.   _gitignore -> .gitignore
    const targetPath = rawPath.split('/').map(fileName => {
      fileName = fileName.replace(/^(_)(\w)(\w*)/, (match, p1, p2, p3) => {
        if (p2 === '_') return p2 + p3
        return '.' + p2 + p3
      })
      return fileName
    }).join('/')

    const sourcePath = path.resolve(source, rawPath) // path/node_modules/@wozjs/kiva-cli/templates/component/index.js
    const fileContent = renderFile(sourcePath, additionalData, ejsOptions)
    if (Buffer.isBuffer(fileContent) || fileContent.trim()) {
      files[targetPath] = fileContent
    }
  }

  return files
}

/**
 * @fileName 模板文件路径   path/node_modules/@wozjs/kiva-cli/templates/component/index.js
 * @data  数据 options rootOptions plugins additionalData
 * @ejsOptions ejs 配置  ejsOptions = {}
 *
 * 渲染文件
 */
function renderFile(fileName, data = {}, ejsOptions = {}) {
  // 检测是否为二进制文件
  if (isBinaryFileSync(fileName)) return fs.readFileSync(fileName)  // return buffer

  const template = fs.readFileSync(fileName, 'utf-8')
  return ejs.render(template, data, ejsOptions)
}

module.exports = async function(params) {
  console.log('before new......')
  console.log()

  const { camelCaseName, pascalCaseName, kebabCaseName , dest } = params

  logWithSpinner(`✨`, `newing component in ${chalk.yellow(dest)}.`)

  // const pkg = await renderPackageJson(appName)
  // await writeFileTree(dest, {
  //   'package.json': JSON.stringify(pkg, null, 2),
  // })

  const source = path.resolve(__dirname, '../templates/component')
  const files = await render(source, {
    // ejs data
    camelCaseName,
    pascalCaseName,
    kebabCaseName,
  })
  // debug('files', Object.keys(files))
  await writeFileTree(dest, files)

  // await pkgInstall(dest)


  stopSpinner()
  console.log(`🎉  Successfully new component ${chalk.yellow(kebabCaseName)}.`)
  console.log()

}