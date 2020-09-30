const fs = require('fs-extra')
const path = require('path')

const reg = /import\s+?(?:(?:[\w*\s{},]*)\s+from\s+?){0,1}(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;{0,1})/g
const SCRIPT_EXTS = [ '.js', '.ts', '.vue' ]

let existsCache = {}
let depsMapCache = {}
let alias = {}       // { '@ui': 'Users/Hayden/xxxx/kiva-ui' }

/**
 * 从 import 语句中提取依赖路径
 * @param {string} code import 语句    import a from '../list'
 * @param {string} filePath 原始文件路径,必须具体到文件名  a/b/c.js
 */
function getPathFromImport(code, filePath) {
  const divider = code.includes('"') ? '"' : "'"
  let depPath = code.split(divider)[1]
  const name = depPath
  const pathType = getPathType(depPath)

  // 相对路径
  if (pathType === 'relative') {
    return {
      name,
      path: fillExt(path.resolve(filePath, '..', depPath)),
    }
  }

  // 绝对路径
  if (pathType === 'absolute' || pathType === 'alias') {
    const aliasKey = getAlias(depPath)
    const aliasPath = alias[aliasKey]
    if (aliasPath) {
      depPath = depPath.replace(aliasKey, aliasPath)
    }
    return {
      name,
      path: fillExt(depPath),
    }
  }

  // npm 包
  return {
    name,
    path: depPath,
  }
}

/**
 *  获取依赖路径类型
 * @param {string} depPath 依赖路径
 * @return {'package'|'relative'|'absolute'|'alias'} package: npm 包,  relative: 相对路径,  absolute: 绝对路径,  alias: webpack alias
 */
function getPathType(depPath) {
  const aliasReg = new RegExp(Object.keys(alias))
  let type = 'package'
  if (/^\./.test(depPath)) {
    type = 'relative'
  } else if (/^\\/.test(depPath)) {
    type = 'absolute'
  } else if (getAlias(depPath)) {
    type = 'alias'
  }
  return type
}
// 返回命中的 alias 键名: 如 @ui
function getAlias(depPath) {
  return Object.keys(alias).find(item => {
    if (item) {
      return depPath.indexOf(item) === 0
    }
    return false
  })
}


function exists(filePath) {
  if (!(filePath in existsCache)) {
    existsCache[filePath] = fs.existsSync(filePath)
  }

  return existsCache[filePath]
}

/**
 * 补充文件名后缀
 * @param {string} filePath
 */
function fillExt(filePath) {
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


function getDeps(file, depsMap) {
  if (depsMapCache[file]) {
    return depsMapCache[file]
  }

  const copyPath = file
  file = fillExt(file)
  if (!file) {
    depsMap.path = copyPath
    depsMap.dependencies = []
    depsMapCache[copyPath] = depsMap
    return depsMap
  }

  const code = fs.readFileSync(file, 'utf-8')
  const imports = code.match(reg) || []
  const importPaths = imports.map(code => {
    return getPathFromImport(code, file)
  })

  importPaths.forEach(dep => {
    getDeps(dep.path, dep)
  })



  depsMap.path = file
  depsMap.dependencies = importPaths
  depsMapCache[file] = depsMap
  return depsMap
}


module.exports = function (file, webpackAlias) {
  alias = webpackAlias
  return getDeps(file, { name: file, path: '', dependencies: [] })
}

// dialog 组件依赖分析结果示例
// {
//   "name": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/dialog/index.js",
//   "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/dialog/index.js",
//   "dependencies": [
//       {
//           "name": "./src/dialog",
//           "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/dialog/src/dialog.js",
//           "dependencies": [
//               {
//                   "name": "vue",
//                   "path": "vue",
//                   "dependencies": []
//               },
//               {
//                   "name": "../../toast/src/toast",
//                   "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/toast/src/toast.js",
//                   "dependencies": [
//                       {
//                           "name": "vue",
//                           "path": "vue",
//                           "dependencies": []
//                       },
//                       {
//                           "name": "./index.vue",
//                           "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/toast/src/index.vue",
//                           "dependencies": []
//                       },
//                       {
//                           "name": "@ui/src/utils",
//                           "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/utils/index.js",
//                           "dependencies": []
//                       }
//                   ]
//               },
//               {
//                   "name": "./index.vue",
//                   "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/dialog/src/index.vue",
//                   "dependencies": []
//               },
//               {
//                   "name": "@ui/src/components/mask",
//                   "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/mask/index.js",
//                   "dependencies": [
//                       {
//                           "name": "./src/index.vue",
//                           "path": "/Users/chenhui12/Code/Messier78/Output/kiva/packages/kiva-ui/src/components/mask/src/index.vue",
//                           "dependencies": []
//                       }
//                   ]
//               }
//           ]
//       }
//   ]
// }
