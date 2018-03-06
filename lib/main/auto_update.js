const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron')

const {autoUpdater} = require('electron-updater')
autoUpdater.logger = CT.vendor.electron_log
autoUpdater.logger.transports.file.level = 'debug'
autoUpdater.logger.info('Checking for updates')

let template = []
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

let win

function sendStatusToWindow(text) {
  log.info(text)
  win.webContents.send('message', text)
}
function createDefaultWindow() {
  win = new BrowserWindow()
  win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`)
  return win
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
  sendStatusToWindow(log_message)
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded')
})

app.on('ready', function() {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  createDefaultWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', function()  {
  autoUpdater.checkForUpdatesAndNotify()
})
