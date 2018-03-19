describe('dir.js', function () {

  it('app', () => {
    const actual   = typeof CT.dir.app
    const expected = 'string'
    assert.equal(actual, expected)
  })

  it('views', () => {
    const actual   = CT.dir.views
    const expected = CT.dir.app + 'lib/views'
    assert.equal(actual, expected)
  })

  it('classes', () => {
    const actual   = CT.dir.classes
    const expected = CT.dir.app + 'lib/main/classes'
    assert.equal(actual, expected)
  })

  it('img', () => {
    const actual   = CT.dir.img
    const expected = CT.dir.app + 'assets/img'
    assert.equal(actual, expected)
  })

  it('triggers', () => {
    console.log(process.env.HOME)
    const actual   = CT.dir.triggers
    const expected = process.env.HOME + '/Library/Application Support/ClipTrigger/triggers'
    assert.equal(actual, expected)
  })

  it('logs', () => {
    const actual   = CT.dir.logs
    const expected = process.env.HOME + '/Library/Logs/electron-mocha/'
    assert.equal(actual, expected)
  })

})
