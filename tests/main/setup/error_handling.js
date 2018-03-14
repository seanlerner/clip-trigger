describe('error_handling.js', () => {

  it('ErrorHandler', () => {
    const expected = 'function'
    const actual   = typeof ErrorHandler
    assert.equal(expected, actual)
  })

  it('uncaughtException', () => {
    // TODO: figure out how to test this
  })

})
