module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'PUT'
    this.endpoint = 'shuffle?state=true'
    this.success  = () => 'Shuffle turned on'

    new CT.triggers.sp.PlayerRequest(this)
  }

}
