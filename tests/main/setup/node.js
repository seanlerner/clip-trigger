describe('node.js', function () {

  it('child_process', () => {
    const expected = 'object'
    const actual   = typeof child_process
    assert.equal(actual, expected, 'child_process setup failed.')
  })

  it('fs', () => {
    const expected = 'object'
    const actual   = typeof fs
    assert.equal(actual, expected, 'fs setup failed.')
  })

  it('os', () => {
    const expected = 'object'
    const actual   = typeof os
    assert.equal(actual, expected, 'os setup failed.')
  })

  it('path', () => {
    const expected = 'object'
    const actual   = typeof path
    assert.equal(actual, expected, 'path setup failed.')
  })

  it('url', () => {
    const expected = 'object'
    const actual   = typeof url
    assert.equal(actual, expected, 'url setup failed.')
  })

  it('util', () => {
    const expected = 'object'
    const actual   = typeof util
    assert.equal(actual, expected, 'util setup failed.')
  })

  it('yamljs', () => {
    const expected = 'function'
    const actual   = typeof yamljs
    assert.equal(actual, expected, 'yamljs setup failed.')
  })

})
