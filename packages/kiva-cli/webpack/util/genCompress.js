const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = [
  new UglifyJsPlugin({
    cache: true,
    parallel: true, // 启用多进程
    sourceMap: true,
    uglifyOptions: {
      compress: {     //压缩代码
        dead_code: true,    //移除没被引用的代码
        // warnings: false,     //当删除没有用处的代码时，显示警告
        loops: true, //当do、while 、 for循环的判断条件可以确定是，对其进行优化
      },
      output: {
        beautify: false,  // 最紧凑的输出
        comments: false,  // 删除所有的注释
      },
      // except: ['$super', '$', 'exports', 'require']    //混淆,并排除关键字
    },
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: true
  }),
]
