module.exports = class {

  constructor() {
    if (CT.logs) {
      CT.logs.win.focus()
      return
    }

    CT.logs = this

    this.create_win()
    this.open_win()
    this.win.on('close', () => CT.logs = null)
  }

  create_win() {
    const { width, height } = CT.electron.screen.getPrimaryDisplay().workAreaSize

    this.win = new CT.electron.BrowserWindow({
      width:           Math.min(width - 100, 1000),
      height:          height - 20,
      name:            'Logs',
      backgroundColor: '#222'
    })
  }

  open_win(win_to_open) {
    this.win.loadURL(url.format({
      pathname: path.join(CT.dir.views, 'logs', 'logs.html'),
      protocol: 'file:'
    }))

    this.win.loadURL
  }

}
