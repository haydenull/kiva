const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const KivaImportAnalyzerPlugin = require('@wozjs/kiva-import-analyzer-plugin')

const baseConfig = require('./base')()
const kivaConfig = require('../config')
const compressConfig = require('./util/genCompress')
const externals = require('./util/genExternals')

function getEntries() {
  const glob = require('glob')
  const basePath = path.resolve(process.cwd(), './src')
  // glob 花括号展开式  a{/b/c,bcd} 将展开为 a/b/c 与 abcd
  // https://juejin.im/post/6844903906024095758
  const componentFiles = glob.sync(`${basePath}/components/**/index.{js,ts}`)
  // console.log('=== componentFiles ===', componentFiles)
  if (componentFiles.length <= 0) throw new Error('未检测到合法组件,请检查目录结构及文件名 \n')
  let res = {}
  componentFiles.forEach(filePath => {
    const key = filePath.replace(/.*src\/components\/([^\/]*)\/index\.(js|ts)$/, (res, $1) => $1)
    // 设置打包后的目录及文件名
    res[`/${key}/index`] = filePath
  })
  // console.log('=== muli component paths weboack ===', res)
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
    // externals: {
    //   vue: {
    //     root: 'Vue',
    //     commonjs: 'vue',
    //     commonjs2: 'vue',
    //     amd: 'vue'
    //   }
    // },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css'
      }),
      new Webpackbar({
        name: 'Kiva Cli Build Component'
      }),
      new CleanWebpackPlugin(),
      new KivaImportAnalyzerPlugin({
        path: './dist/kiva-analyzer',
      }),
    ],
    optimization: {
      minimizer: [
        // ...compressConfig,
      ],
    },
    externals,
    output: {
      path: path.resolve(process.cwd(), 'lib/'),
      publicPath: '/lib/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      // pathinfo: true,
      // library: 'kiva-ui-component',
      libraryTarget: 'commonjs2',
      // umdNamedDefine: true,
    },
  }

  return merge(baseConfig, prodConfig, kivaConfig.configureWebpack(webpack))
}
