const fs = require('fs')

const { remote, shell } = require('electron')

update_regular_log = () => {
  regular_log.innerText = fs.readFileSync(remote.app.CT.dir.logs + 'log.log')
  regular_log.scrollTop = regular_log.scrollHeight
}

update_error_log = () => {
  error_log.innerText = fs.readFileSync(remote.app.CT.dir.logs + 'error.log')
  error_log.scrollTop = error_log.scrollHeight
}

update_logs = () => {
  update_regular_log()
  update_error_log()
}

addEventListener('DOMContentLoaded', update_logs)
