process.env.VCR_MODE='cache'

CT.vendor.settings.setPath(path.join(CT.dir.tests, 'Settings'))

sepia = require('sepia')

sepia.configure({
  verbose: true,
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

module.exports = {
  check_interval: 1,
  console_logging: false,
  notify:         false
}
