describe('config.js', () => {

  it('constructor', () => {
    assert.equal(CT.config.env, 'test')
    assert.equal(CT.config.clip_trigger_server, 'https://clip.smallcity.ca/')
    assert(CT.config.console_logging)
  })

  it('log_config', async () => {
    CT.config.log_config()
    await wait_for(/Env:.+test/)
    CT.config.log_config()
    await wait_for(/Process:  \d+/)
    CT.config.log_config()
    await wait_for(/Version:  \d+\.\d+.\d+/)
    CT.config.log_config()
    await wait_for(/Logging:.+log\.log/)
    CT.config.log_config()
    await wait_for(/Settings:.+Settings/)
  })

  it('login_credentials', () => {
    assert.deepEqual(Object.keys(CT.config.login_credentials), ['email', 'clip_trigger_token'])
  })

})
