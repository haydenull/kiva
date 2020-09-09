const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
          loader: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: true,
                reloadAll: true,
              },
            },
            // 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
          ]
        },
        {
          test: /\.less$/,
          loader: [
            {
              loader: MiniCssExtractPlugin.loader,  // 将 css 提取为单独的文件
              options: {
                hmr: true,
                reloadAll: true,
              },
            },
            // MiniCssExtractPlugin.loader,       // 将 css 提取为单独的文件
            // style-loader 与 MiniCssExtractPlugin.loader 冲突，会产生 documen is not defined 错误
            // 'style-loader',                 // creates style nodes from JS strings
            {
              loader: 'css-loader',            // translates CSS into CommonJS
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'less-loader',             // compiles Less to CSS
              options: {
                sourceMap: true,
              }
            },
          ]
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
          test: /\.(js|jsx)$/,
          loader: require.resolve('babel-loader'),
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
