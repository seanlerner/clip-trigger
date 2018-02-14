fs            = require('fs')
path          = require('path')
child_process = require('child_process')
chalk         = require('chalk')

new class {

  constructor() {
    this.setup()
    this.run_test_suite()
  }

  setup() {
    this.running          = false
    this.timeout_duration = 20000
    this.watch_dir        = path.join(__dirname, '../..')

    fs.watch(this.watch_dir, { recursive: true }, this.check_filename.bind(this))

    process.stdin.on('data', this.run_test_suite.bind(this))
  }

  check_filename(_event_type, filename) {
    if (filename.includes('run_tests_on_fs_event'))
      this.fs_exit()

    this.run_test_suite()
  }

  run_test_suite() {
    if (this.running)
      return

    this.running    = true
    this.timeout_id = setTimeout(this.timeout.bind(this), this.timeout_duration)

    this.clear_screen()
    console.log(chalk.blueBright('Running test suite. Timeout: ', this.timeout_duration))
    console.log()

    this.electron_test =
      child_process
        .spawn('node', [__dirname + '/run_tests'], {stdio: 'inherit'})
        .on('close', this.wrap_up.bind(this))
  }

  wrap_up() {
    clearTimeout(this.timeout_id)
    this.running = false
    console.log()
    console.log(chalk.blueBright('Watching', this.watch_dir))
  }

  timeout() {
    console.log(chalk.redBright(`Test suite timeout, killing process ${this.electron_test.pid}`))
    child_process.spawn('kill', [this.electron_test.pid])
  }

  clear_screen() {
    console.log('\x1Bc')
  }

  fs_exit() {
    console.log()
    console.log(chalk.magentaBright('run_tests_on_fs_event.js modified: restart required'))
    process.exit()
  }

}
