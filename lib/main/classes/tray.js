module.exports = class {

  constructor() {
    this.icon_path = path.join(CT.dir.img, 'icon.png')
    this.tray      = new CT.electron.Tray(this.icon_path)
    this.tray.setToolTip('Clip!')
    this.tray.setContextMenu(CT.menu.items)

    CT.electron.globalShortcut.register(
      'Control+Alt+Command+T',
      () => this.tray.popUpContextMenu()
    )
  }

  set text(text) {
    this.notice(` ${text}`)
  }

  success(text = 'Done!') {
    this.slow_reset('green', text)
  }

  notice(text = 'Notice!') {
    this.tray.setImage(path.join(CT.dir.img, 'yellow.png'))
    this.tray.setTitle(` ${text}`)
  }

  fail(text = 'Error!') {
    this.slow_reset('red', text)
  }

  msg(result) {
    let msg, status

    if (typeof result == 'string') {
      msg    = result
      status = 'success'
    } else if (result instanceof Object && result.notice) {
      msg    = result.notice
      status = 'notice'
    } else if (result instanceof Object && result.fail) {
      msg    = result.fail
      status = 'fail'
    } else {
      msg = `Unhandled Error: ${result}`
      status = 'fail'
    }

    this[status](msg)
  }

  slow_reset(colour, text) {
    this.tray.setImage(path.join(CT.dir.img, `${colour}.png`))
    this.tray.setTitle(` ${text}`)

    setTimeout(() => {
      this.clear_text()
      this.default_icon()
    }, 5000)
  }

  clear_text() {
    this.tray.setTitle('')
    this.default_icon()
  }

  default_icon() {
    this.tray.setImage(this.icon_path)
  }

}
