module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    new CT.triggers.sp.Playing(this.play_or_pause.bind(this), reject)
  }

  play_or_pause(is_playing) {
    if (is_playing)
      new CT.triggers.sp.Pause(this.resolve, this.reject)
    else
      new CT.triggers.sp.Play(this.resolve, this.reject)
  }

}
