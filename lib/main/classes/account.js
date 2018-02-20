module.exports = class {

  constructor() {
    if (CT.account) {
      CT.account.win.focus()
      return
    }

    CT.account = this
    this.create_win()
    this.open_win('checking')
    this.open_appropriate_account_window()

    this.win.on('close', () => CT.account = null)
  }

  open_appropriate_account_window() {
    CT.vendor.request.post(
      CT.config.clip_trigger_server + 'api/sessions',
      { json: CT.config.login_credentials },
      this.create_and_open_win.bind(this)
    )
  }

  create_and_open_win(_err, _res, body) {
    if (body && body.success)
      this.open_win('logged-in')
    else if (body && body.fail)
      this.open_win('logged-out')
    else
      this.open_win('server-error')
  }

  create_win() {
    this.win = new CT.electron.BrowserWindow({
      width:           300,
      height:          460,
      name:            'Account',
      backgroundColor: '#222'
    })
  }

  open_win(win_to_open) {
    this.win.loadURL(url.format({
      pathname: path.join(CT.dir.views, 'account', win_to_open, win_to_open + '.html'),
      protocol: 'file:'
    }))
  }

}
