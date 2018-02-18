module.exports = class {

  constructor() {
    if (CT.trigger_directory) {
      CT.trigger_directory.win.focus()
      return
    }

    CT.trigger_directory = this

    this.create_triggers_dir_if_necessary()
    this.create_win()
    this.open_win()
    this.win.on('close', () => CT.trigger_directory = null)
  }

  create_triggers_dir_if_necessary() {
    if (fs.existsSync(CT.dir.triggers))
      return

    log('Creating triggers dir')
    fs.mkdirSync(CT.dir.triggers)
  }

  create_win() {
    this.win = new CT.electron.BrowserWindow({
      width:           800,
      height:          800,
      name:            'Preferences',
      backgroundColor: '#222'
    })
  }

  open_win(win_to_open) {
    this.win.loadURL(url.format({
      pathname: path.join(CT.dir.views, 'trigger_directory', 'trigger_directory.html'),
      protocol: 'file:'
    }))

    this.win.loadURL
  }

}
