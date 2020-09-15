const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const genStyleLoaders = require('./util/genStyleLoaders')
const babelLoader = require('./util/genBabelLoader')
const tsLoader = require('./util/genTsLoader')

module.exports = function() {
  const baseConfig = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          loader: genStyleLoaders(),
        },
        {
          test: /\.less$/,
          loader: genStyleLoaders('less-loader'),
        },
        {
          test: /\.(png|jpe?g|gif|webp|bmp)(\?.*)?$/,
          loader: require.resolve('url-loader'),
          options: {
            limit: 1024 * 4,
            esModule: false,
            name: 'static/img/[name].[contenthash:8].[ext]',
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: [
            babelLoader,
            tsLoader,
          ],

        },
        {
          test: /\.(js|jsx)$/,
          loader: [
            babelLoader,
          ],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    resolve: {
      alias: {
        '@ui': process.cwd(),
      }
    },
  }
  return baseConfig
}
