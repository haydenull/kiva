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
const compressConfig = require('./util/genCompress')

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
        ...compressConfig,
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
