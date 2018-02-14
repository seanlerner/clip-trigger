module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'PUT'
    this.endpoint = 'play'
    this.success  = () => 'Spotify play'

    new CT.triggers.sp.PlayerRequest(this)
  }

}
