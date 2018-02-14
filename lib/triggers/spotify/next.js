module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'POST'
    this.endpoint = 'next'
    this.success  = () => 'Track skipped'

    new CT.triggers.sp.PlayerRequest(this)
  }

}
