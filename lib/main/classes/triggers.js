module.exports = class {

  constructor() {
    this.create_triggers_dir_if_necessary()
    this.setup_installed_triggers()
    this.setup_user_triggers()
  }

  setup_installed_triggers() {
    log('Setting up installed triggers:')
    fs.readdirSync(CT.dir.installed_triggers)
      .forEach(trigger => this.setup_trigger(trigger))
      // .forEach(this.setup_trigger) // TODO - figure out why this doesn't work
  }

  setup_user_triggers() {
    log('Setting up user triggers:')
    if (!fs.existsSync(CT.dir.user_triggers))
      return

    fs.readdirSync(CT.dir.user_triggers)
      .forEach(trigger => this.setup_trigger(trigger, CT.dir.user_triggers))
  }

  setup_trigger(trigger, dir = CT.dir.installed_triggers) {

    log(trigger)

    const main_file = path.join(dir, trigger, 'main.js')

    try {

      let trigger           = require(main_file)
      trigger               = new trigger
      this[trigger.trigger] = trigger

    } catch (err) {

      const reason  = `Error setting up '${trigger} trigger`,
            handled = true

      new ErrorHandler({reason, err, handled})

    }

  }

  delete(trigger_code) {
    delete this[trigger_code]
  }

  create_triggers_dir_if_necessary() {
    if (fs.existsSync(CT.dir.installed_triggers))
      return

    log('Creating triggers dir')
    fs.mkdirSync(CT.dir.installed_triggers)
  }

}
