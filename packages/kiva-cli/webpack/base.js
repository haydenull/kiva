const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function() {
  const baseConfig = {
    entry: path.resolve(__dirname, '../site/debug/main.js'),
    module: {
      rules: [
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
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/debug/index.html'),
        filename: 'index.html',
        inject: true,
      }),
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