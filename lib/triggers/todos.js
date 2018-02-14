module.exports = class {

  constructor() {
    this.trigger = 'td'
  }

  run(resolve, reject) {

    const
      url     = CT.config.clip_trigger_server + 'api/items',
      content = CT.clipboard.content,
      code    = 'td',
      json    = Object.assign({ content, code }, this.clip_trigger_credentials())

    CT.vendor.request.post(url, { json }, function(err, res, body) {

      if (body && body.success)
        resolve('Item added to todo list.')
      else
        new CT.Reject(reject, err, res, body, __filename)

    })
  }

  clip_trigger_credentials() {
    const email    = settings.get('email'),
          password = settings.get('password')
    return { email, password }
  }

}
