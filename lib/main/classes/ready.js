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
      CT.renderer_monitor  = new CT.RendererMonitor
      CT.teardown          = new CT.Teardown
      CT.tray              = new CT.Tray
      CT.triggers          = new CT.Triggers

      this.log_startup_message()

    } catch (err) {

      const reason   = 'Error caught in Ready constructor',
            filename = __filename

      new ErrorHandler({reason, filename, err})

    }
  }

  log_startup_message() {
    log('Enviroment: ' + CT.config.env)
    log('Process:    ' + process.pid)
    log('Settings:   ' + CT.vendor.settings.file())
    log('Logging:    ' + CT.vendor.electron_log.transports.file.findLogPath())
    log('Clip Trigger Ready!')
  }

}
