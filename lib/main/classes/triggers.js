module.exports = class {

  constructor() {
    this.triggers_dir = os.homedir() + '/triggers/'
    fs.readdirSync(this.triggers_dir)
      .filter(file => fs.lstatSync(this.triggers_dir + file).isDirectory())
      .forEach(this.setup_trigger.bind(this))
      // .forEach(hey => console.log(hey))
  }

  setup_trigger(file) {
    log(`Setting up ${file} trigger`)
    const main_file = this.triggers_dir + file + '/main.js'
    try {
      let trigger           = require(main_file)
      trigger               = new trigger
      this[trigger.trigger] = trigger

    } catch (err) {
      const reason  = `Error setting up ${file} trigger`,
            handled = true

      new ErrorHandler({reason, err, handled})
    }
  }

}
