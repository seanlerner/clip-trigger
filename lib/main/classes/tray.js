module.exports = class {

  constructor() {
    this.icon_path = this.icon('icon')
    this.tray      = new CT.electron.Tray(this.icon_path)
    this.tray.setToolTip(CT.package.nice_name)
    this.tray.setContextMenu(CT.menu.items)
    this.set_global_shortcut()
  }

  set_global_shortcut() {
    CT.electron.globalShortcut.register(
      'Control+Alt+Command+T',
      this.pop_up_context_menu.bind(this)
    )
  }

  pop_up_context_menu() {
    this.tray.popUpContextMenu()
  }

  notice() {
    this.tray.setImage(this.icon('yellow'))
  }

  success(options) {
    this.notification(options)
    this.slow_reset('green')
  }

  fail(options) {
    options.icon = this.icon('red')
    this.notification(options)
    this.slow_reset('red')
  }

  slow_reset(colour) {
    this.tray.setImage(this.icon(colour))
    setTimeout(this.default_icon.bind(this), 2000)
  }

  default_icon() {
    this.tray.setImage(this.icon_path)
  }

  icon(basename) {
    return path.join(CT.dir.img, `${basename}.png`)
  }

  notification(provided_options) {
    this.set_title_if_not_set(provided_options)

    const default_options = { silent: true },
          final_options   = Object.assign(provided_options, default_options)

    new CT.electron.Notification(final_options).show()
  }

  set_title_if_not_set(provided_options) {
    if (!provided_options.title)
      provided_options.title = CT.package.nice_name
  }

}
