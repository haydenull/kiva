process.env.NODE_ENV = 'development'

const chalk = require('chalk')
const ora = require('ora')
const webpack = require('webpack')
const getWebpackConfig = require('../webpack/dev.component')
const path = require('path')
// const genMockRoutes = require('../lib/genMockRoutes')

const WEBPACK_CONFIG_MAP = {
  'react-spa': 'dev.reactSpa',
  'component-libaray': 'dev.component',
}

const kivaConfig = require('../kiva.config')

const spinner = ora('Starting development server...')

function createDevServer (webpackConfig) {
  // console.log('=== webpackConfig ===', webpackConfig)
  const compiler = webpack(webpackConfig)

  const DevServer = require('webpack-dev-server')
  const devServer = new DevServer(compiler, {
    host: 'localhost',
    port: 3002,
    contentBase: path.resolve(process.cwd(), './public'),
    watchContentBase: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    hot: true,
    open: true,
    overlay: true,            // 编译时的错误信息直接显示在页面上
    stats: 'errors-only',     // 禁止显示编译产物信息console
    quiet: true,              // 禁止显示console信息 [wdm]
    // clientLogLevel: 'none',
    // before(app, server, compiler) {
    //   genMockRoutes(app)
    //   app.get('/some/path', (req, res) => {
    //     res.json({ custom: 'mock data' })
    //   })
    // },
  })

  return devServer
}

async function serve() {
  spinner.start()

  const webpackConfig = require(`../webpack/${WEBPACK_CONFIG_MAP[kivaConfig.appType]}`)()
  const devServer = createDevServer(webpackConfig)
  // 禁止显示 wds 信息, 负面影响：无法打开浏览器
  // devServer.showStatus = () => {}

  spinner.stop()

  // Ctrl + C 触发
  ;['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close()
      process.exit()
    })
  })

  return devServer.listen('3002', '0.0.0.0', err => {
    if (err) return console.log(err)
  })
}

module.exports = function(...args) {
  return serve().catch(err => {
    spinner.stop()
    console.error(chalk.red(`serve error`, err))
    process.exit(1)
  })
}
