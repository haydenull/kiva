process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const webpack = require('webpack')

const getWebpackConfig = require('../webpack/prod')

async function build() {
  console.log('start build')
  console.log()

  // console.log('==== webpack config ===', getWebpackConfig())
  const compiler = webpack(getWebpackConfig())

  return new Promise((reslove, reject) => {
    compiler.run((err, status) => {
      if (err) {
        return reject(err)
      }
      const resFormated = status.toJson({ all: false, warnings: true, errors: true })
      if (resFormated.errors.length) {
        return reject(resFormated.errors.join('\n\n'))
      }
      return reslove(resFormated)
    })
  })
}

module.exports = function(...args) {
  return build().then(res => {
    console.log('build success', res)
  }).catch(err => {
    console.error(chalk.red(`build error`, err))
    process.exit(1)
  })
}