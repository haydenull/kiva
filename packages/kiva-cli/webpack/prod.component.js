const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')

const baseConfig = require('./base')()

function getEntries() {
  const glob = require('glob')
  const basePath = path.resolve(process.cwd(), './src')
  const componentFiles = glob.sync(`${basePath}/components/**/index.js`)
  let res = {}
  componentFiles.forEach(filePath => {
    const key = filePath.replace(/.*src\/components\/([^\/]*)\/index\.js$/, (res, $1) => $1)
    // 设置打包后的目录及文件名
    res[`/${key}/index`] = filePath
  })
  // console.log('=== muli component paths weboack ===', componentFiles, res)
  return res
}

// 按需加载需要打包到如下路径
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件

module.exports = function() {
  const prodConfig = {
    mode: 'production',
    entry: getEntries(),
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: require.resolve('vue-loader'),
        // },
        // {
        //   test: /\.css$/,
        //   loader: [
        //     MiniCssExtractPlugin.loader,
        //     require.resolve('css-loader'),
        //   ]
        // },
      ],
    },
    resolve: {},
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css'
      }),
      new Webpackbar({
        name: 'Kiva Cli Build Component'
      }),
    ],
    output: {
      pathinfo: true,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
      path: path.resolve(process.cwd(), 'dist/components'),
    },
  }

  return merge(baseConfig, prodConfig)
}
