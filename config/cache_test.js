process.env.VCR_MODE='cache'

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
  notify:         false
}
