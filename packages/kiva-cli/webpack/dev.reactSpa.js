const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpackbar = require('webpackbar')
const chalk = require('chalk')
const FriendlyErrorsPlugin = require('friendly-errors-plugin')

const kivaConfig = require('../config')
const baseConfig = require('./base')()

const basePath = path.resolve(process.cwd())

module.exports = function() {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: path.resolve(basePath, './src/index.js'),
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: [
            'vue-loader',
            {
              loader: '@wozjs/kiva-markdown-loader',
              options: {
                useCardWrapper: true,
              }
            },
          ]
        },
      ],
    },
    resolve: {},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new Webpackbar({
        name: 'Kiva Cli Serve'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(basePath, './src/index.html'),
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'index.html',
        // chunks: ['chunks', 'index'],
        inject: true,
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
    output: {
      chunkFilename: '[name].js',
    },
  }

  return merge(baseConfig, devConfig, kivaConfig.configureWebpack(webpack))
}
