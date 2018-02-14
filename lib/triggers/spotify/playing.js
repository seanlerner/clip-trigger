module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.method  = 'GET'

    new CT.triggers.sp.PlayerRequest(this)
  }

  success(body) {
    if (body)
      return body.is_playing
  }

}
