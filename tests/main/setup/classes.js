const classes = [ 'About', 'Account', 'Clipboard', 'Monitor', 'Config', 'Log', 'Logs', 'Menu', 'Notify', 'Prefs', 'Ready', 'Run', 'Reject', 'System', 'Teardown', 'Tray', 'TriggerDirectory', 'Triggers', 'Updater']

const test_class = klass => {
  const actual   = typeof CT[klass]
  const expected = 'function'
  assert.equal(actual, expected, `${klass}.js class setup failed.`)
}

const test_classes = () => {
  classes.forEach(test_class)
}

describe('classes.js', function () {
  it('all classes', test_classes)
})
