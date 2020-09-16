const spawn = require('cross-spawn')

module.exports = function(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    if (!command) reject('command is required')

    const task = spawn(command, args, options)

    if (task.stdout) {
      task.stdout.pipe(process.stdout)
    }
    if (task.stderr) {
      task.stderr.pipe(process.stderr)
    }

    task.on('close', code => {
      if (code) {
        const e = new Error(`command ${command} execute failed`)
        e.code = code
        reject(e)
      }
      resolve(command + 'success')
    })

    task.on('error', reject)

    if (!task.stderr && !task.stdout) {
      task.on('exit', code => {
        if (code) {
          const e = new Error('Spawn failed')
          e.code = code
          reject(e)
        }
        resolve(command + 'success')
      })
    }

  })
}
