describe('clipboard.js', () => {

  before(() => {
    CT.electron.clipboard.writeText('pr pretend trigger')
  })

  it('first_two_chars', () => {
    const actual   = CT.clipboard.first_two_chars,
          expected = 'pr'
    assert.equal(actual, expected)
  })

  it('third_char', () => {
    const actual   = CT.clipboard.third_char,
          expected = ' '
    assert.equal(actual, expected)
  })

  it('args', () => {
    const actual   = CT.clipboard.args,
          expected = 'pretend trigger'
    assert.equal(actual, expected)
  })

  it('content', () => {
    const actual   = CT.clipboard.content,
          expected = 'pr pretend trigger'
    assert.equal(actual, expected)
  })

})
