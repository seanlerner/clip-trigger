describe('global.js', function () {

  it('single_line_str()', () => {
    const actual   = single_line_str({ abc: 123 })
    const expected = '{"abc":123}'
    assert.equal(actual, expected)
  })

  it('is_json() with valid json str', () => {
    const actual   = is_json('{ "abc": 123 }')
    const expected = { "abc": 123 }
    assert.deepEqual(actual, expected)
  })

  it('is_json() with invalid json str', () => {
    const actual   = is_json('not json')
    const expected = undefined
    assert.equal(actual, expected)
  })

})
