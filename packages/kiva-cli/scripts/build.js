process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const spawn = require('../utils/spawn')


async function build(type) {
  console.log('start build', type)
  console.log()

  const getWebpackConfig = require(`../webpack/prod.${type}`)
  // console.log('==== webpack config ===', getWebpackConfig())
  const compiler = webpack(getWebpackConfig())

  return new Promise((resolve, reject) => {
    compiler.run((err, status) => {
      if (err) {
        return reject(err)
      }
      const resFormated = status.toJson({ all: false, warnings: true, errors: true })
      if (resFormated.errors.length) {
        return reject(resFormated.errors.join('\n\n'))
      }
      if (type === 'component') {
        const gulpfile = path.resolve(__dirname, '../lib/buildStyle.js')
        spawn('gulp', [ '--gulpfile', gulpfile ])
      }
      return resolve(resFormated)
    })
  })
}

module.exports = function(...args) {
  return build(...args).then(res => {
    console.log('build success', res)
  }).catch(err => {
    console.error(chalk.red(`build error`, err))
    process.exit(1)
  })
}
