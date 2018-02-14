module.exports = class {

  constructor(req_obj) {
    this.req_obj  = req_obj
    this.resolve  = req_obj.resolve
    this.reject   = req_obj.reject
    this.method   = req_obj.method
    this.endpoint = req_obj.endpoint
    this.success  = req_obj.success

    const options = {
      uri:     this.uri,
      method:  this.method,
      headers: this.headers,
      json:    this.json,
      body:    req_obj.body
    }

    CT.vendor.request(options, this.process_response.bind(this))
  }

  get uri() {
    let spotify_player_uri = 'https://api.spotify.com/v1/me/player'

    if (this.endpoint)
      spotify_player_uri += `/${this.endpoint}`

    return spotify_player_uri
  }

  get headers() {
    return { 'Authorization': `Bearer ${CT.vendor.settings.get('spotify_access_token')}` }
  }

  get json() {
    return this.method == 'GET' ? true : false
  }

  process_response(err, res, body) {
    if (res && [200, 202, 204].includes(res.statusCode))
      this.resolve(this.success(body, this.req_obj))
    else
      new CT.Reject(this.reject, err, res, body, __filename)
  }

}
