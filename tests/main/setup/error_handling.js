describe('error_handling.js', () => {

  it('ErrorHandler', () => {
    const actual   = typeof ErrorHandler
    const expected = 'function'
    assert.equal(actual, expected)
  })

  it('uncaughtException', () => {
    // TODO: figure out how to test this
  })

})
