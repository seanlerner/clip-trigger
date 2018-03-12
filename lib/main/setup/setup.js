// CT
CT = {}

// Node
require('./node')

CT.node    = {}
CT.node.fs = fs

// Electron
CT.electron = require('electron')

// Packages
require('./packages')

// Directories
require('./dir')

// package.json
CT.package = require(path.join(CT.dir.app, 'package.json'))

// Error Handling
require('./error_handling')

// Security
require('./ensure_single_instance')

// Access to CT from browser window
CT.electron.app.CT = CT

// Ensure only one instance of Clip Trigger is running
require('./ensure_single_instance')

// CT Classes
require('./classes')

// Logging
CT.log = new CT.Log

// Globals
require('./globals')

// Ready
CT.electron.app.on('ready', () => { new CT.Ready })

// Prevent exit on browser window close
CT.electron.app.on('window-all-closed', () => {})
