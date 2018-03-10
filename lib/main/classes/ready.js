module.exports = class {

  constructor() {
    try {

      CT.config    = new CT.Config
      CT.clipboard = new CT.Clipboard
      CT.monitor   = new CT.Monitor
      CT.menu      = new CT.Menu
      CT.system    = new CT.System
      CT.teardown  = new CT.Teardown
      CT.tray      = new CT.Tray
      CT.triggers  = new CT.Triggers

      if (CT.config.env == 'prod')
        CT.electron.app.dock.hide()

      log(`${CT.package.nice_name} Ready!`)

      CT.updater = new CT.Updater

    } catch (err) {

      const reason   = 'Error caught in Ready constructor',
            filename = __filename

      new ErrorHandler({reason, filename, err})

    }
  }

}
