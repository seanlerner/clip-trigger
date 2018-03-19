describe('about.js', () => {
  it('can be created', () => {
    const actual = new CT.About
    actual.win.openDevTools()
    assert.equal(actual.win.constructor.name, 'BrowserWindow')
  })
})
