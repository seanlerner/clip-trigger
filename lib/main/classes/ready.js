module.exports = class {

  constructor() {
    try {

      CT.electron.app.dock.hide()

      CT.log               = new CT.Log
      CT.config            = new CT.Config
      CT.clipboard         = new CT.Clipboard
      CT.clipboard_monitor = new CT.ClipboardMonitor
      CT.menu              = new CT.Menu
      CT.system            = new CT.System
      CT.teardown          = new CT.Teardown
      CT.tray              = new CT.Tray
      CT.triggers          = new CT.Triggers

      log_success(`${CT.package.nice_name} Ready!`)

    } catch (err) {

      const reason   = 'Error caught in Ready constructor',
            filename = __filename

      new ErrorHandler({reason, filename, err})

    }
  }

}
