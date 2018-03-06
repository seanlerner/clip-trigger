// CT
CT = {}

// Node
child_process = require('child_process')
fs            = require('fs')
os            = require('os')
path          = require('path')
url           = require('url')
yamljs        = require('yamljs')

CT.node    = {}
CT.node.fs = fs

// Electron
CT.electron = require('electron')

// Directories
CT.dir = {}

// App directories
CT.dir.app   = CT.electron.app.getAppPath()
CT.dir.lib   = path.join(CT.dir.app,  'lib')
CT.dir.views = path.join(CT.dir.lib,  'views')
CT.dir.main  = path.join(CT.dir.lib,  'main')
CT.dir.class = path.join(CT.dir.main, 'classes')
CT.dir.img   = path.join(CT.dir.app,  'assets', 'img')

// Config directories
CT.dir.config   = path.join(CT.electron.app.getPath('appData'), 'ClipTrigger')
CT.dir.triggers = path.join(CT.dir.config, 'triggers')

// package.json
CT.package = require(path.join(CT.dir.app, 'package.json'))

// Error Handler
ErrorHandler = require(path.join(CT.dir.class, 'error_handler'))
process.on('uncaughtException', err => new ErrorHandler({reason: 'Uncaught Exception', err: err}))

// Security
global.eval = function () {
  throw new Error('Sorry, this app does not support eval.')
}

// Access to CT from browser window
CT.electron.app.CT = CT

// Ensure only one instance of Clip Trigger is running
CT.already_running = CT.electron.app.makeSingleInstance(() => {
  CT.log.error(`Another ${CT.package.nice_name} app instance was attempted`)
})

if (CT.already_running) {
  console.error(`${CT.package.nice_name} is already running, exiting.`)
  CT.electron.app.quit()
  return
}

// Packages
CT.vendor = {
  chalk:        require('chalk'),
  electron_log: require('electron-log'),
  fs_extra:     require('fs-extra'),
  prettyoutput: require('prettyoutput'),
  request:      require('request'),
  settings:     require('electron-settings'),
  simple_git:   require('simple-git')
}

// Globals
require('./globals')

// CT Classes
CT.Account          = require(path.join(CT.dir.class, 'account'          ))
CT.Clipboard        = require(path.join(CT.dir.class, 'clipboard'        ))
CT.ClipboardMonitor = require(path.join(CT.dir.class, 'clipboard_monitor'))
CT.Config           = require(path.join(CT.dir.class, 'config'           ))
CT.Log              = require(path.join(CT.dir.class, 'log'              ))
CT.Menu             = require(path.join(CT.dir.class, 'menu'             ))
CT.Prefs            = require(path.join(CT.dir.class, 'prefs'            ))
CT.Ready            = require(path.join(CT.dir.class, 'ready'            ))
CT.Reject           = require(path.join(CT.dir.class, 'reject'           ))
CT.System           = require(path.join(CT.dir.class, 'system'           ))
CT.Teardown         = require(path.join(CT.dir.class, 'teardown'         ))
CT.Tray             = require(path.join(CT.dir.class, 'tray'             ))
CT.TriggerDirectory = require(path.join(CT.dir.class, 'trigger_directory'))
CT.Triggers         = require(path.join(CT.dir.class, 'triggers'         ))

// Ready
CT.electron.app.on('ready', () => { new CT.Ready })

// Prevent exit on browser window close
CT.electron.app.on('window-all-closed', () => {})
console.log(path.join(CT.dir.app, 'lib', 'main', 'auto_update'))
require(path.join(CT.dir.main, 'auto_update'))
// CT.dir.class = path.join(CT.dir.app, 'lib', 'main', 'classes')
