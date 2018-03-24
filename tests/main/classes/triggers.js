describe('triggers.js', () => {

  it('can setup a trigger', () => {
    assert.equal(CT.triggers.te.name, 'Test Trigger')
  })

  it('can delete a trigger', () => {
    CT.triggers.delete('ct')
    assert.equal(CT.triggers.ct, undefined)
  })

})
