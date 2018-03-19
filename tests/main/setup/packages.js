describe('packages.js', function () {

  it('tests packages are loaded', () => {

    const packages = {
      chalk:            'function',
      electron_log:     'object',
      fs_extra:         'object',
      prettyoutput:     'function',
      request:          'function',
      settings:         'object',
      simple_git:       'function',
      electron_updater: 'object'
    }

    Object.keys(packages).forEach(package => {
      const actual   = typeof CT.vendor[package]
      const expected = packages[package]
      assert.equal(actual, expected, `${package} setup failed.`)
    })

  })
})
