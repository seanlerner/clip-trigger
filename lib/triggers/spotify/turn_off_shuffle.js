module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'PUT'
    this.endpoint = 'shuffle?state=false'
    this.success  = () => 'Shuffle turned off'

    new CT.triggers.sp.PlayerRequest(this)
  }

}
