describe('account.js', () => {
  it('can be created', () => {
    const actual = new CT.Account
    actual.win.openDevTools()
    assert.equal(actual.win.constructor.name, 'BrowserWindow')
  })
})
