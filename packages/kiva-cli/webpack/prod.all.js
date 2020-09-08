const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpackbar = require('webpackbar')

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
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name].chunk.css',
      }),
      new Webpackbar({
        name: 'Kiva Cli Build All'
      }),
    ],
    output: {
      pathinfo: true,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/',
      path: path.resolve(process.cwd(), 'dist/all'),
    },
  }

  return merge(baseConfig, prodConfig)
}
