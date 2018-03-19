describe('setup.js', function () {
  it('CT', () => {
    actual   = typeof CT
    expected = 'object'
    assert.equal(actual, expected)
  })
})
