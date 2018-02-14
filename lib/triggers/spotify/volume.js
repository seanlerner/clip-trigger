module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.method  = 'GET'

    new CT.triggers.sp.PlayerRequest(this)
  }

  success(body) {
    if (body && body.device && typeof body.device.volume_percent == 'number')
      this.resolve(body.device.volume_percent)
    else
      this.resolve('Volume not available')
  }

}
