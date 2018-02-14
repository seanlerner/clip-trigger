module.exports = class {

  constructor() {
    this.tests     = []
    this.tests_dir = __dirname + '/../tests/'

    fs.readdirSync(this.tests_dir)
      .filter(this.js_file)
      .forEach(this.setup_tests.bind(this))
  }

  js_file(file) {
   return file.includes('.js')
  }

  setup_tests(file) {
    const tests = require(this.tests_dir + file)

    Object.keys(tests)
      .filter(this.argv.bind(this))
      .forEach(this.add_tests.bind(this, tests))
  }

  argv(trigger) {
    const key_filter = process.argv[2]
    return !key_filter || trigger.includes(key_filter)
  }

  add_tests(tests, trigger) {
    this.tests.push([trigger, tests[trigger]])
  }

}
