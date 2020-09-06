const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpackbar = require('webpackbar')
const chalk = require('chalk')
const FriendlyErrorsPlugin = require('friendly-errors-plugin')

const baseConfig = require('./base')()

module.exports = function() {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
        },
        // {
        //   test: /\.css$/,
        //   oneOf: [
        //     {
        //       loader: [
        //         {
        //           loader: require.resolve('vue-style-loader'),
        //           options: {
        //             sourceMap: true,
        //           }
        //         },
        //         {
        //           loader: require.resolve('css-loader'),
        //           options: {
        //             sourceMap: true,
        //             importLoaders: 2
        //           }
        //         }
        //       ],
        //       sideEffects: false,
        //     }
        //   ],
        // },
        {
          test: /\.css$/,
          loader: [
            require.resolve('vue-style-loader'),
            require.resolve('style-loader'),
            require.resolve('css-loader'),
          ]
        },
      ],
    },
    resolve: {},
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new Webpackbar({
        name: 'Kiva Cli'
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