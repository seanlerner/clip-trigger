describe('global.js', function () {

  const
    actual   = last_log_line,
    test_str = 'Testing 123'

  it('log()', () => {
    log(test_str)
    const expected = /\[info\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.error()', () => {
    log.error(test_str)
    const expected = /\[error\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.warn()', () => {
    log.warn(test_str)
    const expected = /\[warn\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.verbose()', () => {
    log.verbose(test_str)
    const expected = /\[verbose\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.info()', () => {
    log(test_str)
    const expected = /\[info\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.debug()', () => {
    log.debug(test_str)
    const expected = /\[debug\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

  it('log.silly()', () => {
    log.silly(test_str)
    const expected = /\[silly\] Testing 123/
    assert(actual().match(expected), assert_fail_msg(expected, actual()))
  })

})

function assert_fail_msg(expected, actual) {
  return `
      Expected: '${expected}'
        to be found within:
      Actual:   '${actual}'
  `
}

function last_log_line() {
  const
    log_contents =
      fs
      .readFileSync(CT.vendor.electron_log.transports.file.findLogPath(), 'utf-8')
      .split('\n')

  return log_contents[log_contents.length - 2]
}
