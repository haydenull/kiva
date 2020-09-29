class ImportAnalyzerPlugin {
  constructor(options) {
    console.log('=== ImportAnalyzerPlugin 参数 ===', options)
  }

  apply(compiler) {
    // compiler.plugin('webpacksEventHook', function(compilation, callback) {
    //   console.log('=== hello kiva-import-analyzer ===')
    //   callback()
    // })
    compiler.hooks.entryOption.tap('ImportAnalyzerPlugin', (context, entry) => {
      console.log('=== hello kiva-import-analyzer ===', entry)
    })


  }
}

module.exports = ImportAnalyzerPlugin
