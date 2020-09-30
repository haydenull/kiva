const fs = require('fs-extra')
const path = require('path')

const reg = /import\s+?(?:(?:[\w*\s{},]*)\s+from\s+?){0,1}(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;{0,1})/g
const SCRIPT_EXTS = [ '.js', '.ts' ]

/**
 * 从 import 语句中提取依赖路径
 * @param {string} code import 语句    import a from '../list'
 * @param {string} filePath 原始文件路径
 */
function getPathFromImport(code, filePath) {
  const divider = code.includes('"') ? '"' : "'"
  const depPath = code.split(divider)[1]

  // 相对路径
  if (depPath.includes('.')) {
    // TODO: 补全后缀文件名
    return path.resolve(filePath, depPath)
  }

  // 绝对路径
  return depPath
}

let existsCache = {}
function exists(filePath) {
  if (!(filePath in existsCache)) {
    existsCache[filePath] = fs.existsSync(filePath)
  }

  return existsCache[filePath]
}

export function fillExt(filePath) {
  // /(?:\.js)|(?:\.ts)$/
  const reg = new RegExp(SCRIPT_EXTS.map(ext => `(?:\\${ext})`).join('|') + '$')
  if (reg.test(filePath)) return filePath

  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}${SCRIPT_EXTS[i]}`
    if (exists(completePath)) {
      return completePath
    }
  }

  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}/index${SCRIPT_EXTS[i]}`
    if (exists(completePath)) {
      return completePath
    }
  }

  return ''
}

let depsMap = {}
module.exports = function getDeps(file) {
  if (depsMap[file]) return depsMap[file]

  file = fillExt(file)
  if (!file) return false

  const code = fs.readFileSync(file, 'utf-8')
  const imports = code.match(reg) || []
  const importPaths = imports.map(code => {
    getPathFromImport(code, file)
  })

  depsMap[file] = importPaths
  // 递归查找
  importPaths.forEach(getDeps)

  console.log('=== imports ===', depsMap)
  return depsMap
}