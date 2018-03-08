const fs = require('fs'),
      { ipcRenderer, remote, shell } = require('electron')

update_log = (log, file) => {
  log.innerText = fs.readFileSync(remote.app.CT.dir.logs + file)
  log.scrollTop = log.scrollHeight
}

update_logs = () => {
  update_log(regular_log, 'log.log')
  update_log(error_log,   'error.log')
}

append_item_to_log = (log, item) => {
  log.append(item + '\n')
  log.scrollTop = log.scrollHeight
}

append_item_to_regular_log = (_event, item) => {
  append_item_to_log(regular_log, item)
}

append_item_to_error_log = (_event, item) => {
  append_item_to_log(error_log, item)
}

addEventListener('DOMContentLoaded', update_logs)

ipcRenderer.on('append_item_to_regular_log', append_item_to_regular_log)
ipcRenderer.on('append_item_to_error_log',   append_item_to_error_log)
