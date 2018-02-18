module.exports = class {

  constructor() {
    fs.readdirSync(CT.dir.triggers)
      .forEach(this.setup_trigger.bind(this))
  }

  setup_trigger(dir) {
    log(`Setting up ${dir} trigger`)
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

}
