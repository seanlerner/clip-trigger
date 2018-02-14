module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.method  = 'GET'
    this.success = body => body.shuffle_state

    new CT.triggers.sp.PlayerRequest(this)
  }

}
