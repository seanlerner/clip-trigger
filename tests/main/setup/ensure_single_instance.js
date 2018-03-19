describe('ensure_single_instance.js', function () {

  it('already_running', () => {
    const actual   = CT.already_running
    const expected = false
    assert.equal(actual, expected, 'Ct.already_running failed.')
  })

})
