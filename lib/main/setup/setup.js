// Node core libraries
require('./node')

// Global helpers
require('./globals')

// Setup global CT object
CT          = {}
CT.node     = {}
CT.node.fs  = fs
CT.electron = require('electron')
CT.vendor   = require('./packages')
CT.dir      = require('./dir')
CT.package  = require(path.join(CT.dir.app, 'package.json'))

// CT classes
require('./classes')

// Logging
CT.log = new CT.Log

// Error Handling
require('./error_handling')

// Ensure only one instance of Clip Trigger is running
require('./ensure_single_instance')

// Prevent exit on browser window close
CT.electron.app.on('window-all-closed', () => {})

// Access to CT from browser window
CT.electron.app.CT = CT

// Instantiate singletons
CT.electron.app.on('ready', () => { new CT.Ready })
