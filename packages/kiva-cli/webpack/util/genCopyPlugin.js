const fs = require('fs-extra')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const basePath = process.cwd()
module.exports = function() {
  const source = path.resolve(basePath, './public')
  const option = {
    from: source,
    to: path.resolve(basePath, './dist/public'),
    // ignore: '',
  }

  // 全局 public
  if (fs.existsSync(source)) {
    return [ new CopyWebpackPlugin({
      patterns: [ option ]
    }) ]
  }
  return []
}
