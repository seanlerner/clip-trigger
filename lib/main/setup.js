// Node
child_process = require('child_process')
fs            = require('fs')
os            = require('os')
path          = require('path')
url           = require('url')
yamljs        = require('yamljs')

// CT
CT     = { }
CT.dir = path.join(__dirname, '..', '..') + '/'

// Error Handler
ErrorHandler = require(CT.dir + 'lib/main/classes/error_handler')
process.on('uncaughtException', err => new ErrorHandler({reason: 'Uncaught Exception', err: err}))

// Electron
CT.electron = require('electron')

// Access to CT from browser window
CT.electron.app.CT = CT

// Ensure only one instance of Clip Trigger is running
CT.already_running = CT.electron.app.makeSingleInstance(() => {
  CT.log.error('Another Clip Trigger app instance was attempted')
})

if (CT.already_running) {
  console.error('Clip Trigger is already running, exiting.')
  CT.electron.app.quit()
  return
}

// Packages
CT.vendor = {
  electron_log: require('electron-log'),
  settings:     require('electron-settings'),
  request:      require('request'),
  chalk:        require('chalk')
}

// Globals
require('./globals')

// CT Classes
CT.Account          = require(CT.dir + 'lib/main/classes/account'          )
CT.Clipboard        = require(CT.dir + 'lib/main/classes/clipboard'        )
CT.ClipboardMonitor = require(CT.dir + 'lib/main/classes/clipboard_monitor')
CT.Config           = require(CT.dir + 'lib/main/classes/config'           )
CT.Git              = require(CT.dir + 'lib/main/classes/git'              )
CT.Log              = require(CT.dir + 'lib/main/classes/log'              )
CT.Menu             = require(CT.dir + 'lib/main/classes/menu'             )
CT.Prefs            = require(CT.dir + 'lib/main/classes/prefs'            )
CT.Ready            = require(CT.dir + 'lib/main/classes/ready'            )
CT.Reject           = require(CT.dir + 'lib/main/classes/reject'           )
CT.RendererMonitor  = require(CT.dir + 'lib/main/classes/renderer_monitor' )
CT.System           = require(CT.dir + 'lib/main/classes/system'           )
CT.Teardown         = require(CT.dir + 'lib/main/classes/teardown'         )
CT.Tray             = require(CT.dir + 'lib/main/classes/tray'             )
CT.Triggers         = require(CT.dir + 'lib/main/classes/triggers'         )

// Ready
CT.electron.app.on('ready', () => { new CT.Ready })

// Prevent exit on browser window close
CT.electron.app.on('window-all-closed', () => {})
