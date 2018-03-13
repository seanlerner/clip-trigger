module.exports = class About {

  constructor() {
    if (CT.about) {
      CT.about.win.focus()
      return
    }

    CT.about = this
    this.create_win()
    this.open_win()

    this.win.on('close', () => CT.about = null)
  }

  create_win() {
    this.win = new CT.electron.BrowserWindow({
      width:           300,
      height:          220,
      name:            'About',
      backgroundColor: '#222'
    })
  }

  open_win(win_to_open) {
    this.win.loadURL(url.format({
      pathname: path.join(CT.dir.views, 'about', 'about.html'),
      protocol: 'file:'
    }))

    this.win.loadURL
  }

}
