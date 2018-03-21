module.exports = class {

  constructor() {
    this.set_defaults()
    this.set_env()
    this.log_config()
  }

  set_defaults() {
    const settings = require(path.join(CT.dir.app, 'config', 'defaults'))
    this.assign_settings(settings)
  }

  set_env() {
    if (process.env.CT_ENV)
      this.env = process.env.CT_ENV

    const settings = require(path.join(CT.dir.app, 'config', this.env))
    this.assign_settings(settings)
  }

  assign_settings(settings) {
    Object.keys(settings).forEach(setting => this[setting] = settings[setting])
  }

  log_config() {
    log('Env:      ' + this.env)
    log('Process:  ' + process.pid)
    log('Version:  ' + CT.package.version)
    log('Settings: ' + CT.vendor.settings.file())
    log('Logging:  ' + CT.vendor.electron_log.transports.file.findLogPath())
    log('Server:   ' + this.clip_trigger_server)
  }

  get login_credentials() {
    const email              = CT.vendor.settings.get('email'),
          clip_trigger_token = CT.vendor.settings.get('clip_trigger_token')
    return { email, clip_trigger_token }
  }

}
