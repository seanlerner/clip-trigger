// App directories

// CT.dir.app   = CT.electron.app.getAppPath()

const all_dirs = __dirname.split('/'),
      app_dirs = all_dirs.splice(0, all_dirs.length - 3)

app_dirs[0]  = '/'

CT.dir       = {}
CT.dir.app   = path.join(...app_dirs)
CT.dir.lib   = path.join(CT.dir.app,  'lib')
CT.dir.views = path.join(CT.dir.lib,  'views')
CT.dir.main  = path.join(CT.dir.lib,  'main')
CT.dir.class = path.join(CT.dir.main, 'classes')
CT.dir.img   = path.join(CT.dir.app,  'assets', 'img')

// Config directories
CT.dir.config   = path.join(CT.electron.app.getPath('appData'), 'ClipTrigger')
CT.dir.triggers = path.join(CT.dir.config, 'triggers')
CT.dir.logs     = CT.vendor.electron_log.transports.file.findLogPath().replace('log.log', '')
