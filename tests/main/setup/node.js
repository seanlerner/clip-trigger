describe('node.js', function () {

  it('child_process', () => {
    const actual   = typeof child_process
    const expected = 'object'
    assert.equal(actual, expected, 'child_process setup failed.')
  })

  it('fs', () => {
    const actual   = typeof fs
    const expected = 'object'
    assert.equal(actual, expected, 'fs setup failed.')
  })

  it('os', () => {
    const actual   = typeof os
    const expected = 'object'
    assert.equal(actual, expected, 'os setup failed.')
  })

  it('path', () => {
    const actual   = typeof path
    const expected = 'object'
    assert.equal(actual, expected, 'path setup failed.')
  })

  it('url', () => {
    const actual   = typeof url
    const expected = 'object'
    assert.equal(actual, expected, 'url setup failed.')
  })

  it('util', () => {
    const actual   = typeof util
    const expected = 'object'
    assert.equal(actual, expected, 'util setup failed.')
  })

  it('yamljs', () => {
    const actual   = typeof yamljs
    const expected = 'function'
    assert.equal(actual, expected, 'yamljs setup failed.')
  })

})
