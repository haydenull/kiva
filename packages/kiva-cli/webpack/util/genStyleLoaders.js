const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = function(preProcessor) {

  const extractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // https://juejin.im/post/6844904203026956302
      // 当前的css所在的文件相对于打包后的根路径dist的相对路径
      // 解决 background-image: url('') 相对路径背景图片,打包完成后路径为 css/img/xxx 错误的问题
      publicPath: '../',
    }
  }

  const vueStyleLoader = [
    {
      loader: 'vue-style-loader',
      options: {
        sourceMap: isDev,
      }
    },
    'style-loader',
  ]

  let loaders = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      }
    }

  ]
  loaders = isDev
    ? vueStyleLoader.concat(loaders)
    : [ extractLoader ].concat(loaders)

  if (preProcessor) {
    loaders.push({
      loader: preProcessor,
      options: {
        sourceMap: isDev
      }
    })
  }

  return loaders

}
