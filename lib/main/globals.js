// Logging
log = (...data) => CT.log.info(data)

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
