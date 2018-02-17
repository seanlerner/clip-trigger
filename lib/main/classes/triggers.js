module.exports = class {

  constructor() {
    this.triggers_dir = os.homedir() + '/triggers/'
    fs.readdirSync(this.triggers_dir)
      .filter(this.is_file_and_not_clip_trigger_directory.bind(this))
      .forEach(this.setup_trigger.bind(this))
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

  is_file_and_not_clip_trigger_directory(file) {
    fs.lstatSync(this.triggers_dir + file).isDirectory() &&
    file != 'clip-trigger-directory'
  }

}
