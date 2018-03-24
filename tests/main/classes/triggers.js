describe('triggers.js', () => {

  it('can setup a trigger', () => {
    assert.equal(CT.triggers.hw.name, 'Hello World Trigger')
  })

  it('can delete a trigger', () => {
    CT.triggers.delete('hw')
    assert.equal(CT.triggers.hw, undefined)
  })

})
