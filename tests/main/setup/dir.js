describe('dir.js', function () {

  it('app', () => {
    const expected = 'string'
    const actual   = typeof CT.dir.app
    assert.equal(expected, actual)
  })

  it('views', () => {
    const expected = CT.dir.app + 'lib/views'
    const actual   = CT.dir.views
    assert.equal(expected, actual)
  })

  it('classes', () => {
    const expected = CT.dir.app + 'lib/main/classes'
    const actual   = CT.dir.classes
    assert.equal(expected, actual)
  })

  it('img', () => {
    const expected = CT.dir.app + 'assets/img'
    const actual   = CT.dir.img
    assert.equal(expected, actual)
  })

  it('triggers', () => {
    console.log(process.env.HOME)
    const expected = process.env.HOME + '/Library/Application Support/ClipTrigger/triggers'
    const actual   = CT.dir.triggers
    assert.equal(expected, actual)
  })

  it('logs', () => {
    const expected = process.env.HOME + '/Library/Logs/electron-mocha/'
    const actual   = CT.dir.logs
    assert.equal(expected, actual)
  })

})
