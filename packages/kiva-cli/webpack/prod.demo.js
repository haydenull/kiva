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
      demo: path.resolve(__dirname, '../site/debug/main.js'),
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
      new Webpackbar({
        name: 'Kiva Cli Build Demo'
      }),
    ],
    output: {
      pathinfo: true,
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].chunk.js',
      publicPath: '/',
      path: path.resolve(process.cwd(), 'dist/demo'),
    },
  }

  return merge(baseConfig, prodConfig)
}
