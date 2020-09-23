const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const genStyleLoaders = require('./util/genStyleLoaders')
const babelLoader = require('./util/genBabelLoader')
const tsLoader = require('./util/genTsLoader')
const genCopyPlugin = require('./util/genCopyPlugin')

const isProd = process.env.NODE_ENV === 'production'
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
          test: /\.(svg)(\?.*)?$/,
          loader: 'svg-inline-loader',
          options: {
            minify: isProd,
            name: `static/img/[name].[contenthash:8].[ext]`
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            // 不支持 contenthash
            name: `static/fonts/[name].[hash:8].[ext]`
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
      ...genCopyPlugin(),
    ],
    resolve: {
      alias: {
        '@ui': process.cwd(),
      }
    },
  }
  return baseConfig
}
