const { ipcRenderer, remote } = require('electron')

updater = remote.app.CT.vendor.electron_updater.autoUpdater

addEventListener('DOMContentLoaded', () => {


  version.innerText = remote.app.CT.package.version

  updater.on('checking-for-update', () => {
    console.log('in checking for update')
    status.innerText = 'Checking for update...'
  })
  updater.on('update-available', (info) => {
    status.innerText = 'Update available.'
  })
  updater.on('update-not-available', (info) => {
    status.innerText = 'Update not available.'
  })
  updater.on('error', (err) => {
    status.innerText = 'Error in auto-updater. ' + err
  })
  updater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
    status.innerText = log_message
  })
  updater.on('update-downloaded', (info) => {
    status.innerText = 'Update downloaded'
  })

  updater.checkForUpdatesAndNotify()

})
