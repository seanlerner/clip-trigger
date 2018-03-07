const { remote, shell } = require('electron')

update_log = () => {
  log.innerText = remote.app.CT.package.version
}

addEventListener('DOMContentLoaded', update_log)
