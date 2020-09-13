const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const FriendlyErrorsPlugin = require('friendly-errors-plugin')

const baseConfig = require('./base')()

module.exports = function() {
  const prodConfig = {
    mode: 'production',
    // entry: {
    //   demo: path.resolve(__dirname, '../site/debug/main.js'),
    // },
    entry: {
      debug: [path.resolve(__dirname, '../site/debug/main.js')],
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
      new Webpackbar({
        name: 'Kiva Cli Build Site'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/debug/index.html'),
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'debug.html',
        chunks: ['chunks', 'debug'],
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
          messages: ['🎉🎉🎉 build sites success'],
          // notes: ['Happy Coding'],
        },
        clearConsole: false,
        logLevel: 'WARNING',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].chunk.css',
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      path: path.resolve(process.cwd(), './site'),
      publicPath: '/',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
      pathinfo: true,
    },
  }

  return merge(baseConfig, prodConfig)
}
