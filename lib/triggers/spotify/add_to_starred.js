module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.add_to_starred_manager()
  }

  async add_to_starred_manager() {
    this.playing = await this.currently_playing().catch(this.fail.bind(this))

    if (!this.playing)
      return
    else if (this.playing == 'Nothing currently playing') {
      this.fail(this.playing)
      return
    }

    const playlist      = await this.starred_playlist().catch(this.fail.bind(this))
    const is_on_starred = await this.on_starred(playlist)

    if (is_on_starred)
      this.reject(`'${this.playing.name}' is already on your Starred list`)
    else
      this.add_to_starred(playlist)
  }

  currently_playing() {
    return new Promise(
      (resolve, reject) => new CT.triggers.sp.CurrentlyPlaying(resolve, reject, 'object')
    )
  }

  starred_playlist() {
    return new Promise(
      (resolve, reject) => new CT.triggers.sp.StarredPlaylist(resolve, reject)
    )
  }

  on_starred(playlist) {
    return new Promise(
      (resolve, reject) => new CT.triggers.sp.OnStarred(resolve, reject, playlist, this.playing)
    )
  }

  add_to_starred(playlist) {
    const options = {
      method: 'POST',
      uri:    this.uri(playlist),
      headers: { 'Authorization': `Bearer ${CT.vendor.settings.get('spotify_access_token')}` },
      json:   {"uris": [this.playing.uri]}
    }

    CT.vendor.request(options, this.add_to_starred_result.bind(this))
  }

  add_to_starred_result(err, res, body) {
    if (body && body.snapshot_id)
      this.resolve(this.playing.name + ' added to Starred')
    else
      new CT.Reject(this.reject, err, res, body, __filename)
  }

  uri(playlist) {
    return `https://api.spotify.com/v1/users/${playlist.owner.id}/playlists/${playlist.id}/tracks`
  }

  fail(reason) {
    this.reject(reason)
  }

}
