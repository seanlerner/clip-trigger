module.exports = class {

  constructor() {
    this.env                         = process.env.CT_ENV || 'prod'
    const env_config                 = require(path.join(CT.dir, 'config', this.env))
    this.clip_trigger_server         = env_config.clip_trigger_server
    this.clip_trigger_spotify_server = env_config.clip_trigger_spotify_server
    this.console_logging             = true
    this.triggers_dir                = os.homedir() + '/triggers/'

    this.log_config()
  }

  log_config() {
    log('Env:      ' + this.env)
    log('Process:  ' + process.pid)
    log('Settings: ' + CT.vendor.settings.file())
    log('Logging:  ' + CT.vendor.electron_log.transports.file.findLogPath())
  }

}
