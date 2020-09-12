const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = function(preProcessor) {

  const extractLoader = {
    loader: MiniCssExtractPlugin.loader,
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