const chalk = require('chalk')
const path = require('path')
const { isBinaryFileSync  } = require('isbinaryfile')
const debug = require('debug')('kiva:cli-new')
const { logWithSpinner, stopSpinner } = require('../utils/spinner')
const writeFileTree = require('../utils/writeFileTree')
const { render } = require('../utils/ejsRender')


module.exports = async function(params) {
  console.log('before new......')
  console.log()

  const { camelCaseName, pascalCaseName, kebabCaseName , dest } = params

  logWithSpinner(`✨`, `creating component in ${chalk.yellow(dest)}.`)

  // const pkg = await renderPackageJson(appName)
  // await writeFileTree(dest, {
  //   'package.json': JSON.stringify(pkg, null, 2),
  // })

  const source = path.resolve(__dirname, '../templates/component')
  const files = await render(source, {
    // ejs data
    camelCaseName,
    pascalCaseName,
    kebabCaseName,
  })
  // debug('files', Object.keys(files))
  await writeFileTree(dest, files)

  // await pkgInstall(dest)


  stopSpinner()
  console.log(`🎉  Successfully new component ${chalk.yellow(kebabCaseName)}.`)
  console.log()

}