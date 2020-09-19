process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const ora = require('ora')
const fs = require('fs-extra')
const path = require('path')

async function newComponent(componentName) {

  // 小驼峰
  const camelCaseName = componentName
    .replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
  // 大驼峰
  const pascalCaseName = camelCaseName
    .replace(/^([a-z])/, (all, letter) => letter.toUpperCase())
  // 中划线
  const kebabCaseName = componentName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-*/, '')

  const targetDir = path.resolve(process.cwd(), `./src/components/${kebabCaseName}`)

  // 同名文件夹已存在
  if (fs.existsSync(targetDir)) {
    return Promise.reject(`🏥 Target directory ${chalk.cyan(targetDir)} already exists.`)
  }

  // 生成文件
  await require('../lib/genComponentTemplate')({
    camelCaseName,
    pascalCaseName,
    kebabCaseName,
    dest: targetDir,
  })


}

module.exports = (...args) => {
  return newComponent(...args).catch(err => {
    console.error(chalk.red(`😭 new component error: \n`, err, '\n'))
    process.exit(1)
  })
}