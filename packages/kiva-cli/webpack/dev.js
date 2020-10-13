const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpackbar = require('webpackbar')
const chalk = require('chalk')
const FriendlyErrorsPlugin = require('friendly-errors-plugin')
const ChainConfig = require('webpack-chain')

const kivaConfig = require('../config')
const baseConfig = require('./base')()

module.exports = function() {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
      demo: [path.resolve(__dirname, '../site/debug/main.js')],
      docs: [path.resolve(__dirname, '../site/docs/main.js')],
    },
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
        // template: path.resolve(__dirname, '../site/debug/index.html'),
        template: kivaConfig.demoHtml,
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'demo.html',
        chunks: ['chunks', 'demo'],
        inject: true,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/docs/index.html'),
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'index.html',
        chunks: ['chunks', 'docs'],
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

  const chainConfig = new ChainConfig()
  if (typeof kivaConfig.chainWebpack === 'function') {
    kivaConfig.chainWebpack(chainConfig)
  }

  return merge(baseConfig, devConfig, chainConfig.toConfig(), kivaConfig.configureWebpack)
}
