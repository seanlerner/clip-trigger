module.exports = class {

  constructor(resolve, reject) {
    this.resolve   = resolve
    this.reject    = reject
    this.playlists = []
    this.offset    = 0
    this.get_50_playlists()
  }

  get_50_playlists() {
    const options = {
      method:  'GET',
      uri:     `https://api.spotify.com/v1/me/playlists?limit=50&offset=${this.offset}`,
      headers: { 'Authorization': `Bearer ${CT.vendor.settings.get('spotify_access_token')}` },
      json:    true
    }

    CT.vendor.request(options, this.process_repsonse.bind(this))
    this.offset += 50
  }

  process_repsonse(err, res, body) {
    if (body && body.items)
      this.add_playlists(body.items)

    if (body && body.items && body.items.length == 50)
      this.get_50_playlists()
    else if (this.playlists.length > 0)
      this.select_random_playlist()
    else
      new CT.Reject(this.reject, err, res, body, __filename)
  }

  add_playlists(items) {
    this.playlists.push.apply(this.playlists, items)
  }

  select_random_playlist() {
    this.set_filter()
    this.set_desired_playlists()

    if (this.desired_playlists.length > 0)
      this.resolve(this.desired_playlists[this.random_number])
    else
      this.reject(`No playlists match '${this.filter_from_clipboard}'`)
  }

  set_filter() {
    this.filter_from_clipboard = CT.clipboard.content.split(' ').slice(1).join(' ')
  }

  set_desired_playlists() {
    this.desired_playlists = this.playlists.filter(this.matches_filter.bind(this))
  }

  matches_filter(playlist) {
    return playlist.name.toLowerCase().indexOf(this.filter_from_clipboard.toLowerCase()) != -1
  }

  get random_number() {
    return Math.floor(Math.random() * this.desired_playlists.length)
  }

}
