module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    new CT.triggers.sp.ShuffleState(this.toggle_shuffle.bind(this), reject)
  }

  toggle_shuffle(shuffle_state) {
    const
      new_shuffle_state = shuffle_state ? false : true,
      new_shuffle_word  = new_shuffle_state ? 'on' : 'off'

    this.method   = 'PUT'
    this.endpoint = `shuffle?state=${new_shuffle_state}`
    this.success  = () => `Shuffle ${new_shuffle_word}`

    new CT.triggers.sp.PlayerRequest(this)
  }

}
