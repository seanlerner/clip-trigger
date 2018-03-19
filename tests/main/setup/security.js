describe('security.js', function () {

  it('throws error on eval', () => {

    try {
      eval('1 + 1')
    } catch (err) {
      const actual   = err.message
      const expected = 'Sorry, this app does not support eval.'
      assert.equal(actual, expected)
    }

  })

})
