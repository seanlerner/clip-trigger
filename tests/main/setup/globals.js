describe('global.js', function () {

  it('clip_trigger_credentials()', () => {
    const expected = ['email', 'clip_trigger_token']
    const actual   = Object.keys(clip_trigger_credentials())
    assert.deepEqual(expected, actual)
  })

  it('single_line_str()', () => {
    const expected = '{"abc":123}'
    const actual   = single_line_str({ abc: 123 })
    assert.equal(expected, actual)
  })

  it('is_json() with valid json str', () => {
    const expected = { "abc": 123 }
    const actual   = is_json('{ "abc": 123 }')
    assert.deepEqual(expected, actual)
  })

  it('is_json() with invalid json str', () => {
    const expected = undefined
    const actual   = is_json('not json')
    assert.equal(expected, actual)
  })

})
