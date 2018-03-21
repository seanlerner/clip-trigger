console.log('globals')
// Logging
log = msg => {
  CT.log.info(msg)

  log.error   = CT.log.error
  log.warn    = CT.log.warn
  log.info    = CT.log.info
  log.verbose = CT.log.verbose
  log.debug   = CT.log.debug
  log.silly   = CT.log.silly
}

llog = msg => {
  CT.log.info(msg)

  console.log(CT.log)

  llog.error   = CT.log.error
  llog.warn    = CT.log.warn
  llog.info    = CT.log.info
  llog.verbose = CT.log.verbose
  llog.debug   = CT.log.debug
  llog.silly   = CT.log.silly
}

// Settings
clip_trigger_credentials = () => {
  return {
    email:              CT.vendor.settings.get('email'),
    clip_trigger_token: CT.vendor.settings.get('clip_trigger_token')
  }
}

// JSON helpers
single_line_str = obj =>
  JSON.stringify(obj).replace(/\\n|\\|  /g, '')

is_json = str => {
  try { return JSON.parse(str) }
  catch (_) { }
}
