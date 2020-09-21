const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const { isBinaryFileSync  } = require('isbinaryfile')

/**
 * @fileName 模板文件路径   path/node_modules/@vue/cli-service/generator/template/_gitignore
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
exports.render = async function render(source, additionalData = {}, ejsOptions = {}) {
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