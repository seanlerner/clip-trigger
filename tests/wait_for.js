const
  path               = require('path'),
  spawn              = require('child_process').spawn,
  log                = path.join(process.env.HOME, 'Library', 'Logs', 'electron-mocha', 'log.log'),
  tail               = spawn('tail', ['-n', '0', '-f', log])

wait_for = regex => new Promise((resolve, _reject) => {

  let output = ''
  tail.stdout.on('data', data => output += data)

  const check = () => {
    if(regex.test(output)) {
      output = ''
      resolve()
    } else {
      setTimeout(check)
    }
  }

  check()

})
