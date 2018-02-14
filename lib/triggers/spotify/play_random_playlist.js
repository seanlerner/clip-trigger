module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.get_shuffle_play()
  }

  get_shuffle_play() {
    new CT.triggers.sp.RandomPlaylist(this.play_playlist.bind(this), this.reject)
  }

  play_playlist(playlist) {
    this.playlist = playlist

    let req_obj = {
      method:   'PUT',
      endpoint: 'play',
      body:     JSON.stringify({ 'context_uri': playlist.uri }),
      success:  () => `Playing ${playlist.name}`,
      resolve:  this.turn_on_shuffle.bind(this),
      reject:   this.reject
    }

    new CT.triggers.sp.PlayerRequest(req_obj)
  }

  turn_on_shuffle() {
    new CT.triggers.sp.TurnOnShuffle(this.final_resolve.bind(this), this.reject)
  }

  final_resolve() {
    this.resolve(`Playing ${this.playlist.name}`)
  }

}
