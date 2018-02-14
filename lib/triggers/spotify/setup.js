module.exports = class {

  constructor(resolve, reject) {
    const
      win      = new CT.electron.BrowserWindow({width: 800, height: 800, name: 'Spotify'}),
      type     = 'rawData',
      bytes    =  this.buffer_bytes,
      postData = [ { type, bytes } ],
      uri      = CT.config.clip_trigger_spotify_server + 'login'

    win.loadURL(uri, { postData })

    win.on('close', () => {
      resolve('Setup complete')
    })
  }

  get buffer_bytes() {
    const
      email       = clip_trigger_credentials().email,
      password    = clip_trigger_credentials().password,
      redirect_to = '/spotify/authorize'

    return Buffer.from(`email=${email}&password=${password}&redirect_to=${redirect_to}`)
  }

}
