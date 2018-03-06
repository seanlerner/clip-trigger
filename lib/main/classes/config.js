module.exports = class {

  constructor() {
    this.env                         = process.env.CT_ENV || 'prod'
    const env_config                 = require(path.join(CT.dir.app, 'config', this.env))
    this.clip_trigger_server         = env_config.clip_trigger_server
    this.clip_trigger_spotify_server = env_config.clip_trigger_spotify_server
    this.console_logging             = true
    this.log_config()
  }

  log_config() {
    log('Env:      ' + this.env)
    log('Process:  ' + process.pid)
    log('Version:  ' + CT.package.version)
    log('Settings: ' + CT.vendor.settings.file())
    log('Logging:  ' + CT.vendor.electron_log.transports.file.findLogPath())
  }

  get login_credentials() {
    const email              = CT.vendor.settings.get('email'),
          clip_trigger_token = CT.vendor.settings.get('clip_trigger_token')
    return { email, clip_trigger_token }
  }

}
