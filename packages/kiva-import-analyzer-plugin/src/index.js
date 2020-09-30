const fs = require('fs-extra')
const path = require('path')

const getDeps = require('./util/getDeps')

function writeFileRecursive(path, buffer, callback){
  let lastPath = path.substring(0, path.lastIndexOf("/"))
  fs.mkdir(lastPath, {recursive: true}, (err) => {
    if (err) return callback(err)
    fs.writeFile(path, buffer, function(err){
      if (err) return callback(err)
      return callback(null)
    })
  })
}

class ImportAnalyzerPlugin {
  constructor(options) {
    console.log('=== ImportAnalyzerPlugin 参数 ===', options)
    this.destPath = options.path
  }

  apply(compiler) {
    compiler.hooks.entryOption.tap('ImportAnalyzerPlugin', (context, entry) => {
      console.log('=== hello kiva-import-analyzer === \n', entry)
      const webpackAlias = compiler.options.resolve.alias
      Object.keys(entry).forEach(key => {
        const deps = getDeps(entry[key], webpackAlias)
        const dest = path.resolve(process.cwd(), this.destPath, `./${key}.json`)
        writeFileRecursive(dest, JSON.stringify(deps, null, 2), err => {
          if (err) console.log('=== 依赖分析结果写文件失败 ===', err, dest)
        })
        // console.log()
        // console.log(`=== ${entry[key]} 依赖分析结果 === \n`, JSON.stringify(deps))
      })
    })

    // compiler.hooks.normalModuleFactory.tap('ImportAnalyzerPlugin', (context) => {
    //   console.log('==== xxxxxxxxxxxx ====', context)
    // })


  }
}

module.exports = ImportAnalyzerPlugin
