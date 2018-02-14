require('./globals')

new class {

  constructor() {
    helper.clipboard_write('')
    this.tests = new TestsLoader().tests
    this.headers()
    this.start_clip_trigger()
    this.stats = { Pass: 0, Fail: 0, Timeout: 0 }
    process.on('uncaughtException', this.uncaught_exception.bind(this))
  }

  headers() {
    helper.clear_screen()
    helper.log(`${helper.current_time} | ${process.pid}`)
    console.log()
    helper.log('Starting Clip Trigger ...')
    console.log()
  }

  start_clip_trigger() {
    const app_dir = __dirname + '/../..',
          clip    = app_dir + '/bin/clip',
          args    = [app_dir, 'test']
          // args    = [app_dir, 'test', 'debugger']

    process.env.FORCE_COLOR = true
    this.clip_trigger = child_process.spawn(clip, args)
    this.clip_trigger.stdout.on('data', this.check_if_ready.bind(this))
  }

  check_if_ready(data) {
    process.stdout.write(data)

    if (data.includes('Clip Trigger Ready')) {
      this.next_test()
    } else if (data.includes('Clip Trigger is already running')) {
      helper.err('Aborting test run')
      this.tear_down()
    }
  }

  next_test() {
    if (this.tests.length > 0)
      this.run()
    else
      this.results()
  }

  async run() {
    const
      [clipboard_write_text, expected] = this.tests.pop(),
      this_test                        = new RunTest(clipboard_write_text, expected),
      result                           = await this_test.run()

    this.stats[result]++
    this.next_test()
  }

  results() {
    console.log()
    this.display_stat('Pass')
    this.display_stat('Fail')
    this.display_stat('Timeout')
    console.log()
    this.tear_down()
  }

  display_stat(stat) {
    const amount = this.stats[stat],
          result = `${stat}:`.padEnd(9) + amount

    if (amount > 0)
      console.log(helper.colourize(stat, result))
    else
      helper.log(result)
  }

  tear_down(err) {
    helper.log('Stopping Clip Trigger')
    console.log()
    this.clip_trigger.stdout.on('data', this.check_if_shutdown.bind(this))
    child_process.exec('killall Electron')
    this.shutdown_id = setTimeout(() => helper.err('Stop failed'), 1500)
  }

  check_if_shutdown(data) {
    clearTimeout(this.shutdown_id)
    console.log()

    if (data.includes('Shutting down'))
      helper.log('Stop successful')
  }

  uncaught_exception(err) {
    helper.err(err)
    helper.err(err.stack)
    tear_down()
  }

}
