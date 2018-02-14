module.exports = class {

  constructor(resolve, reject, playlist, playing) {
    this.resolve  = resolve
    this.reject   = reject
    this.playlist = playlist
    this.playing  = playing
    this.offset   = 0

    this.get_100_tracks()
  }

  get_100_tracks() {
    const options = {
      method:  'GET',
      uri:     `https://api.spotify.com/v1/users/${this.playlist.owner.id}/playlists/${this.playlist.id}/tracks?offset=${this.offset}`,
      headers: { 'Authorization': `Bearer ${CT.vendor.settings.get('spotify_access_token')}` },
      json:    true
    }

    CT.vendor.request(options, this.process_response.bind(this))
    this.offset += 100
  }

  process_response(err, res, body) {
    if (body && this.is_on_starred(body.items))
      this.resolve(true)
    else if (body && body.items.length == 100)
      this.get_100_tracks()
    else if (body)
      this.resolve(false) // Resolving false means this track is not on Starred
    else
      new CT.Reject(this.reject, err, res, body, __filename)
  }

  is_on_starred(items) {
    return items.map (item  => item.track.id)
                .find(item => item == this.playing.id)
  }

}
