module.exports = class {

  constructor(resolve, reject, transform_volume, limit) {
    this.resolve = resolve
    this.reject  = reject
    this.method  = 'PUT'
    this.change_volume(transform_volume, limit)
  }

  async change_volume(transform_volume, limit) {
    const current_volume = await this.volume

    if (typeof current_volume == 'number')
      this.process_new_volume(current_volume, transform_volume, limit)
    else if (current_volume == 'Volume not available')
      this.resolve(current_volume)
    else
      this.reject('Unhandled volume change request')
  }

  process_new_volume(current_volume, transform_volume, limit) {
    const new_volume = transform_volume(current_volume)

    if (new_volume != current_volume)
      this.set_volume(new_volume)
    else
      this.resolve(`Volume at ${limit}`)
  }

  get volume() {
    return new Promise(resolve => new CT.triggers.sp.Volume(resolve, this.reject))
  }

  set_volume(new_volume) {
    this.new_volume = new_volume
    this.endpoint   = `volume?volume_percent=${new_volume}`
    new CT.triggers.sp.PlayerRequest(this)
  }

  success(_body, that) {
    return `Volume set to ${that.new_volume}`
  }

}
