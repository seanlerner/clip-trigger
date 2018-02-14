module.exports = class {

  constructor(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.offset  = 0

    this.get_50_playlists()
  }

  get_50_playlists() {
    const options = {
      method:  'GET',
      uri:     `https://api.spotify.com/v1/me/playlists?limit=50&offset=${this.offset}`,
      headers: { 'Authorization': `Bearer ${CT.vendor.settings.get('spotify_access_token')}` },
      json:    true
    }

    CT.vendor.request(options, this.check_for_starred.bind(this))
    this.offset += 50
  }

  check_for_starred(err, res, body) {

    const starred = body.items && body.items.find(this.starred)

    if (starred)
      this.resolve(starred)
    else if (body.items && body.items.length == 50)
      this.get_50_playlists()
    else if (body.items)
      this.reject("No 'Starred' playlist to add to")
    else
      new CT.Reject(this.reject, err, res, body, __filename)

  }

  starred(playlist) {
    return playlist.name == 'Starred'
  }

}
