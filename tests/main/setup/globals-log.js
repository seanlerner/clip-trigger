describe('global.js', function () {

  const test_str = 'Testing 123'

  it('log()', () => {
    log(test_str)
    const actual   = last_log_line()
    const expected = /\[info\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.error()', () => {
    log.error(test_str)
    const actual   = last_log_line()
    const expected = /\[error\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.warn()', () => {
    log.warn(test_str)
    const actual   = last_log_line()
    const expected = /\[warn\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.verbose()', () => {
    log.verbose(test_str)
    const actual   = last_log_line()
    const expected = /\[verbose\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.info()', () => {
    log(test_str)
    const actual   = last_log_line()
    const expected = /\[info\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.debug()', () => {
    log.debug(test_str)
    const actual   = last_log_line()
    const expected = /\[debug\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

  it('log.silly()', () => {
    log.silly(test_str)
    const actual   = last_log_line()
    const expected = /\[silly\] Testing 123/
    assert(actual.match(expected), assert_fail_msg(actual, expected))
  })

})

function assert_fail_msg(actual, expected) {
  return `
      Actual:   '${actual}'
      Expected: '${expected}'`
}

function last_log_line() {
  const
    log_contents =
      fs
      .readFileSync(CT.vendor.electron_log.transports.file.findLogPath(), 'utf-8')
      .split('\n')

  return log_contents[log_contents.length - 2]
}
