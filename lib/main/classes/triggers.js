module.exports = class {

  constructor() {
    fs.readdirSync(CT.dir + 'lib/triggers/')
      .filter(file => file.includes('.js'))
      .forEach(this.setup_trigger.bind(this))
  }

  setup_trigger(file) {
    let trigger           = require(CT.dir + 'lib/triggers/' + file)
    trigger               = new trigger
    this[trigger.trigger] = trigger
  }

}
