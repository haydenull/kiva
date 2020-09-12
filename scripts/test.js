const minimist = require('minimist')
const rawArgs = process.argv.slice(2)
const args = minimist(rawArgs)

console.log('===', args, rawArgs)
let regex
if (args.p) {
  const packages = (args.p || args.package).split(',').join('|')
  regex = `.*/${packages}/__tests__/.*\\.spec\\.js$`
  const i = rawArgs.indexOf('-p')
  rawArgs.splice(i, 2)
}
console.log('regex', regex, rawArgs)

const jestArgs = [
  '--env', 'node',
  '--runInBand',
  ...rawArgs,
  ...(regex ? [regex] : [])
]

console.log(`running jest with args: ${jestArgs.join(' ')}`)

require('jest').run(jestArgs)

// yarn test -p packages/kiva-markdown-loader