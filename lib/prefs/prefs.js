const { ipcRenderer, remote } = require('electron')

addEventListener('DOMContentLoaded', () => {

  system_startup.checked = remote.app.getLoginItemSettings().openAtLogin

  system_startup.addEventListener('click', function(_event) {
    if (system_startup.checked)
      remote.app.CT.prefs.login_item_true()
    else
      remote.app.CT.prefs.login_item_false()
  })

})
