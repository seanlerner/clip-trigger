const
  app      = __dirname.replace('lib/main/setup', ''),
  lib      = path.join(app, 'lib'),
  views    = path.join(lib, 'views'),
  main     = path.join(lib, 'main'),
  classes  = path.join(lib, 'main', 'classes'),
  img      = path.join(app, 'assets', 'img')
  config   = path.join(CT.electron.app.getPath('appData'), 'ClipTrigger'),
  triggers = path.join(config, 'triggers'),
  tests    = path.join(app, 'tests'),
  logs     = CT.vendor.electron_log.transports.file.findLogPath().replace('log.log', '')

module.exports = { app, views, classes, img, triggers, logs, tests }
