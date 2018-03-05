module.exports = class {

  constructor() {
    if (CT.prefs) {
      CT.prefs.win.focus()
      return
    }

    CT.electron.ipcMain.on('async', (_event, arg) => {
      switch(arg) {
        case 'login_item_true':
          this.login_item_true()
          break
        case 'login_item_false':
          this.login_item_false()
          break
      }
    })

    CT.prefs = this
    this.create_win()
    this.open_win()

    this.win.on('close', () => CT.prefs = null)
  }

  login_item_true() {
    log('Adding to system login items')

    CT.electron.app.setLoginItemSettings({
      openAtLogin: true,
      path: CT.dir.bin,
      args: ['clip', '--hidden']
    })
  }

  login_item_false() {
    log('Removing from system login items')
    child_process.exec(`osascript -e 'tell application "System Events" to delete login item "${CT.package.name}"'`)
  }

  create_win() {
    this.win = new CT.electron.BrowserWindow({
      width:           400,
      height:          460,
      name:            'Preferences',
      backgroundColor: '#222'
    })
  }

  open_win(win_to_open) {
    this.win.loadURL(url.format({
      pathname: path.join(CT.dir.views, 'prefs', 'prefs.html'),
      protocol: 'file:'
    }))

    this.win.loadURL
  }

}
