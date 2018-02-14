module.exports = class {

  constructor(clipboard_write_text, expected) {
    this.clipboard_write_text = clipboard_write_text
    this.expected             = expected
    this.real_stdout_write    = process.stdout.write
    process.stdout.write      = this.process_output.bind(this)
  }

  headers() {
    console.log()
    helper.log('Command:  ' + this.clipboard_write_text)
    helper.log('Expect:   ' + this.expected)
  }

  run() {
    return new Promise((resolve, reject) => {
      this.headers()
      this.resolve         = resolve
      this.reject          = reject
      this.test_start_time = Date.now()
      this.timeout         = setTimeout(this.timeout.bind(this), 5000)
      this.captured_text   = ''
      helper.clipboard_write(this.clipboard_write_text)
    })
  }

  process_output(str) {
    this.captured_text += str
    this.real_stdout_write.apply(process.stdout, [str])
    if (/Resolved|Rejected/.test(this.captured_text))
      this.pass_or_fail()
  }

  pass_or_fail() {
    let result

    if (this.expected.test(this.captured_text))
      result = 'Pass'
    else
      result = 'Fail'

    this.conclude_test(result)
  }

  timeout() {
    this.conclude_test('Timeout')
  }

  conclude_test(result) {
    clearTimeout(this.timeout)
    process.stdout.write = this.real_stdout_write
    helper.log('Duration: ' + (Date.now() - this.test_start_time) + 'ms')
    helper.log('Result:   ' + helper.colourize(result, result))
    this.resolve(result)
  }

}
