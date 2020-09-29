const path = require('path')
const fs = require('fs-extra')
const nodeExternals = require('webpack-node-externals')

const config = require('../../config')

const packageName = config.packageName
const baseDir = process.cwd()

let externals = {}

const componentsList = fs.readdirSync(path.resolve(baseDir, './src/components'))
const utilsList = fs.readdirSync(path.resolve(baseDir, './src/utils'))
const mixinsList = fs.readdirSync(path.resolve(baseDir, './src/mixins'))

componentsList.forEach(file => {
  file = path.basename(file, '.js')
  externals[`@ui/src/components/${file}`] = `${packageName}/lib/${file}`
})
utilsList.forEach(file => {
  file = path.basename(file, '.js')
  externals[`@ui/src/utils/${file}`] = `${packageName}/lib/utils/${file}`
})
mixinsList.forEach(file => {
  file = path.basename(file, '.js')
  externals[`@ui/src/mixins/${file}`] = `${packageName}/lib/mixins/${file}`
})

externals = [Object.assign({
  vue: 'vue',
}, externals), nodeExternals()]

module.exports = externals
