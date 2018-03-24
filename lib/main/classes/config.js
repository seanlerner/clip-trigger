module.exports = class {

  constructor() {
    this.defaults = require(path.join(CT.dir.app, 'config', 'defaults'))
    this.set_defaults()
    this.set_env()
    this.set_command_line()
  }

  set_defaults() {
    this.assign_settings(this.defaults)
  }

  set_env() {
    if (process.env.CT_ENV)
      this.env = process.env.CT_ENV

    const settings = require(path.join(CT.dir.app, 'config', this.env))
    this.assign_settings(settings)
  }

  set_command_line() {
    Object.keys(this.defaults).forEach(setting => {
      if (process.env[setting])
        this[setting] = this.convert_to_type(process.env[setting])
    })
  }

  convert_to_type(str) {
    if (str == 'false')
      return false
    else
      return str
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
    return {
      email:              CT.vendor.settings.get('email'),
      clip_trigger_token: CT.vendor.settings.get('clip_trigger_token')
    }

  }

}
