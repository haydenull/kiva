const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')()

module.exports = function() {
  const prodConfig = {
    mode: 'production',
    entry: {
      ui: path.resolve(__dirname, '../site/debug/entry/ui.js'),
      // demos: path.resolve(__dirname, '../site/debug/main.js'),
    },
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
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      }),
      new Webpackbar({
        name: 'Kiva Cli Build All'
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true, // 启用多进程
          uglifyOptions: {
            compress: {     //压缩代码
              dead_code: true,    //移除没被引用的代码
              // warnings: false,     //当删除没有用处的代码时，显示警告
              loops: true, //当do、while 、 for循环的判断条件可以确定是，对其进行优化
            },
            // except: ['$super', '$', 'exports', 'require']    //混淆,并排除关键字
          },
        })
      ],
    },
    output: {
      path: path.resolve(process.cwd(), 'dist/all'),
      publicPath: '/dist/',
      filename: 'kiva-ui.common.js',
      chunkFilename: '[name].chunk.js',
      pathinfo: true,
      library: 'kiva-ui',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  }

  return merge(baseConfig, prodConfig)
}
