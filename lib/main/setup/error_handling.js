const error_log = path.join(process.env.HOME, 'Library', 'Logs', 'ClipTrigger', 'error.log')

if (!fs.existsSync(error_log))
  fs.closeSync(fs.openSync(error_log, 'w'))

ErrorHandler = require(path.join(CT.dir.classes, 'error_handler'))

process.on('uncaughtException', err => new ErrorHandler({reason: 'Uncaught Exception', err: err}))
