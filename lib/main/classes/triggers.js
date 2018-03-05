module.exports = class {

  constructor() {
    this.create_triggers_dir_if_necessary()

    fs.readdirSync(CT.dir.triggers)
      .forEach(this.setup_trigger.bind(this))
  }

  setup_trigger(dir) {
    log(`Setting up ${dir}`)
    const main_file = path.join(CT.dir.triggers, dir, 'main.js')
    try {
      let trigger           = require(main_file)
      trigger               = new trigger
      this[trigger.trigger] = trigger

    } catch (err) {
      const reason  = `Error setting up '${dir} trigger`,
            handled = true

      new ErrorHandler({reason, err, handled})
    }
  }

  delete(trigger_code) {
    delete this[trigger_code]
  }

  create_triggers_dir_if_necessary() {
    if (fs.existsSync(CT.dir.triggers))
      return

    log('Creating triggers dir')
    fs.mkdirSync(CT.dir.triggers)
  }

}
