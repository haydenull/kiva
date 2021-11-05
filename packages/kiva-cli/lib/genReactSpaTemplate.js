const chalk = require('chalk')
const path = require('path')
const debug = require('debug')('kiva:cli-generate')
const { logWithSpinner, stopSpinner } = require('../utils/spinner')
const writeFileTree = require('../utils/writeFileTree')
const getNpmLatestVersion = require('../utils/getNpmLatestVersion')
const { render } = require('../utils/ejsRender')

/**
 * 生成 package.json 文件内容
 * @param {*} appName
 */
async function renderPackageJson(appName) {
  try {
    const npmPkgs = [ '@wozjs/kiva-cli', 'react', 'react-dom' ]
    const npmPkgsVersion = await getNpmLatestVersion(npmPkgs)
    debugger
    // 生成 package.json
    const pkg = {
      name: appName,
      version: '0.0.1',
      author: '',
      main: 'dist/index.js',
      private: true,
      scripts: {
        "dev": "kiva serve",
        "build:all": "kiva build all",
        "build:component": "kiva build component",
        "build": "kiva build react-spa",
        "deploy": "kiva deploy"
      },
      dependencies: {
        "react": `^${npmPkgsVersion['react']}`,
        "react-dom": `^${npmPkgsVersion['react-dom']}`
      },
      devDependencies: {
        "@wozjs/kiva-cli": `^${npmPkgsVersion['@wozjs/kiva-cli']}`
      }
    }
    return pkg
  } catch (error) {
    console.log('=== network error ===', error)
    process.exit(1)
  }
}

/**
 * 下载 npm 包
 */
async function pkgInstall(targetDir) {
  const execa = require('execa')
  try {
    await execa('yarn', {
      cwd: targetDir,
      stdio: 'inherit',
    })
  } catch (error) {
    console.log('=== yarn install error ===', error)
  }
}

module.exports = async function(projectName, dest) {
  console.log('before creating......')
  console.log()

  logWithSpinner(`✨`, `Creating project in ${chalk.yellow(dest)}.`)

  const pkg = await renderPackageJson(projectName)
  await writeFileTree(dest, {
    'package.json': JSON.stringify(pkg, null, 2),
  })

  const source = path.resolve(__dirname, '../templates/react-spa')
  const files = await render(source, {
    projectName, // ejs data
  })
  debug('files', Object.keys(files))
  await writeFileTree(dest, files)

  await pkgInstall(dest)


  stopSpinner()
  console.log(`🎉  Successfully created project ${chalk.yellow(projectName)}.`)
  console.log()

}