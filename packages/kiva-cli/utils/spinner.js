const ora = require('ora')
const chalk = require('chalk')

const spinner = ora()

let lastMsg = null
exports.logWithSpinner = function(symbol, msg) {
  if (!msg) {
    msg = symbol
    symbol = chalk.green('✔')
  }

  if (lastMsg) spinner.stopAndPersist(lastMsg)

  spinner.text = ` ${msg}`

  lastMsg = {
    symbol,
    msg,
  }

  spinner.start()
}

exports.stopSpinner = function() {
  if (lastMsg) {
    spinner.stopAndPersist(lastMsg)
  } else {
    spinner.stop()
  }
  lastMsg = null
}