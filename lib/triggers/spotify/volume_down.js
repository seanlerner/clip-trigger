module.exports = class {

  constructor(resolve, reject) {
    new CT.triggers.sp.ChangeVolume(resolve, reject, this.transform_volume, 'minimum')
  }

  transform_volume(current_volume) {
    if (current_volume > 10)
      return current_volume - 10
    else
      return 0
  }

}
