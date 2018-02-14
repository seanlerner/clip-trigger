module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'PUT'
    this.endpoint = 'pause'
    this.success  = () => 'Spotify paused'

    new CT.triggers.sp.PlayerRequest(this)
  }

}
