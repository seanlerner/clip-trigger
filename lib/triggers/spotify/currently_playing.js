module.exports = class {

  constructor(resolve, reject, format) {
    this.resolve  = resolve
    this.reject   = reject
    this.format   = format
    this.method   = 'GET'
    this.endpoint = 'currently-playing'

    new CT.triggers.sp.PlayerRequest(this)
  }

  success(body, that) {
    if (body && body.is_playing)
      return that.currently_playing(body, that)
    else
      return 'Nothing currently playing'
  }

  currently_playing(body, that) {
    if (that.format == 'object')
      return body.item
    else
      return that.song_details(body.item)
  }

  song_details(item) {
    const
      song   = item.name,
      artist = item.artists[0].name,
      album  = item.album.name

    return `${song} by ${artist} from the album ${album}`
  }

}
