const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function() {
  const baseConfig = {
    entry: path.resolve(__dirname, '../site/debug/main.js'),
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
            MiniCssExtractPlugin.loader,       // 将 css 提取为单独的文件
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
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/debug/index.html'),
        favicon: path.resolve(__dirname, '../site/common/assets/favicon.ico'),
        filename: 'index.html',
        inject: true,
      }),
      new VueLoaderPlugin(),
    ],
    resolve: {},
    output: {
      pathinfo: true,
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      path: path.resolve(process.cwd(), 'dist'),
    },
  }
  return baseConfig
}
