module.exports = class {

  constructor() {

    if (CT.trigger_directory) {
      CT.trigger_directory.win.focus()
      return
    }

    this.clone_clip_trigger_directory_if_necessary()

    CT.trigger_directory = this
    this.create_win()
    this.open_win()
    this.win.on('close', () => CT.trigger_directory = null)
  }

  clone_clip_trigger_directory_if_necessary() {
    const trigger_directory_dir = CT.config.triggers_dir + '/clip-trigger-directory'

    if (fs.existsSync(trigger_directory_dir))
      return

    const clip_trigger_directory_repo = 'https://github.com/seanlerner/clip-trigger-directory'

    log(`Cloning clip-trigger-directory from ${clip_trigger_directory_repo} to ${CT.config.triggers_dir}`)

    const simple_git = CT.vendor.simple_git(CT.config.triggers_dir)
    simple_git.clone(clip_trigger_directory_repo)
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
      pathname: CT.dir + 'lib/views/trigger_directory/trigger_directory.html',
      protocol: 'file:'
    }))

    this.win.loadURL
  }

}
