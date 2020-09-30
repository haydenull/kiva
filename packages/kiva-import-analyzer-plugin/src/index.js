
const getDeps = require('./util/getDeps')

class ImportAnalyzerPlugin {
  constructor(options) {
    console.log('=== ImportAnalyzerPlugin 参数 ===', options)
  }

  apply(compiler) {
    compiler.hooks.entryOption.tap('ImportAnalyzerPlugin', (context, entry) => {
      console.log('=== hello kiva-import-analyzer ===', entry)
      Object.keys(entry).forEach(key => {
        getDeps(entry[key])
      })
    })


  }
}

module.exports = ImportAnalyzerPlugin
