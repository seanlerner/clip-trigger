describe('settings.js', () => {

  it('set', () => {
    const my_key   = String(Date.now()),
          my_value = 'my_value'

    CT.settings.set(my_key, my_value)
    const actual = CT.settings.get(my_key)
    assert.equal(actual, my_value)
  })

  it('set nested', () => {
    const my_key   = String(Date.now()),
          my_value = 'my_value_with_this'

    this.name = 'test-nested-key-value'
    CT.settings.set(my_key, my_value, this)

    const actual   = CT.vendor.settings.get(this.name),
          expected = {}

    expected[my_key] = my_value

    assert.deepEqual(actual, expected)
  })

})
