module.exports = class {

  constructor() {
    this.env                         = process.env.CT_ENV || 'prod'
    const env_config                 = require(path.join(CT.dir, 'config', this.env))
    this.clip_trigger_server         = env_config.clip_trigger_server
    this.clip_trigger_spotify_server = env_config.clip_trigger_spotify_server
    this.console_logging             = true
    this.triggers_dir                = os.homedir() + '/triggers/'
  }
}
