const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')
const chalk = require('chalk')
const FriendlyErrorsPlugin = require('friendly-errors-plugin')

const baseConfig = require('./base')()

module.exports = function() {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, '../site/debug/main.js'),
    module: {
      rules: [
        // {
        //   test: /\.vue$/,
        //   loader: 'vue-loader',
        // },
        // {
        //   test: /\.less$/,
        //   loader: [
        //     require.resolve('vue-style-loader'),
        //     require.resolve('style-loader'),
        //     require.resolve('css-loader'),
        //     require.resolve('less-loader'),
        //   ]
        // },
      ],
    },
    resolve: {},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new Webpackbar({
        name: 'Kiva Cli Serve'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/debug/index.html'),
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'index.html',
        inject: true,
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].chunk.css',
      }),
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['Your application is running here: 127.0.0.1:3002'],
          notes: ['Happy Coding'],
        },
        clearConsole: false,
        logLevel: 'WARNING',
      }),
    ],
  }
  return merge(baseConfig, devConfig)
}
