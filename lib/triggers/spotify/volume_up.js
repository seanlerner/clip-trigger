module.exports = class {

  constructor(resolve, reject) {
    new CT.triggers.sp.ChangeVolume(resolve, reject, this.transform_volume, 'maximum')
  }

  transform_volume(current_volume) {
    if (current_volume < 90)
      return current_volume + 10
    else
      return 100
  }

}
