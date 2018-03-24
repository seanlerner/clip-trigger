process.env.VCR_MODE='cache'

sepia = require('sepia')

sepia.configure({
  // verbose: true,
  debug:   true
})

sepia.filter({
  url: /socket\.wunderlist\.com/,
  forceLive: true
})

sepia.filter({
  url: /a\.wunderlist\.com.+api\/health/,
  forceLive: true
})

CT.vendor.settings.setPath(path.join(CT.dir.tests, 'Settings'))
CT.dir.installed_triggers = path.join(CT.dir.tests, 'triggers')

module.exports = {
  check_interval: 1,
  console_logging: false,
  notify:         false
}
