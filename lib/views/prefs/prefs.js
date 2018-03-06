const { ipcRenderer, remote } = require('electron')

addEventListener('DOMContentLoaded', setup)

function setup() {
  setup_system_startup()
  setup_auto_update()
}

function setup_system_startup() {
  system_startup.checked = remote.app.getLoginItemSettings().openAtLogin
  system_startup.addEventListener('click', system_startup_click)
}

function system_startup_click(_event) {
  if (system_startup.checked)
    remote.app.CT.prefs.login_item_true()
  else
    remote.app.CT.prefs.login_item_false()
}

function setup_auto_update() {

  const
    settings             = remote.app.CT.vendor.settings,
    auto_update_disabled = settings.get('auto_update_disabled')

  auto_update.checked = !auto_update_disabled

  auto_update.addEventListener('click', function(event) {
    if (auto_update.checked)
      settings.delete('auto_update_disabled')
    else
      settings.set('auto_update_disabled', 'true')
  })

}
