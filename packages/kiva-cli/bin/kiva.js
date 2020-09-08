#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')

// 检查 node 版本
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.
      \nPlease upgrade your Node version.`
    ))
    process.exit(1)
  }
}
checkNodeVersion(require('../package.json').engines.node, 'kiva-cli')


const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

// serve
program
  .command('serve')
  .description('serve demo and debug')
  .action((siteType, cmd) => {
    require('../scripts/serve')(siteType)
  })

// build
program
  .command('build')
  .description('build lib')
  .action((siteType, cmd) => {
    require('../scripts/build')(siteType)
  })

program.parse(process.argv)