module.exports = class {

  constructor() {
    this.icon_path = this.icon('icon')
    this.tray      = new CT.electron.Tray(this.icon_path)
    this.tray.setToolTip(CT.package.nice_name)
    this.tray.setContextMenu(CT.menu.items)
    this.set_global_shortcut()
  }

  default_icon() {
    this.tray.setImage(this.icon_path)
  }

  notice() {
    this.tray.setImage(this.icon('yellow'))
  }

  icon(basename) {
    return path.join(CT.dir.img, `${basename}.png`)
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

}
