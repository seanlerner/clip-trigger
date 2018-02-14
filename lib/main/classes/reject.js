module.exports = class {

  constructor(reject, err, resp, body, filename) {
    this.reject = reject

    if (filename)
      this.filename = path.basename(filename)

    this.error(err, resp, body)
  }

  error(err, resp, body) {
    let reason

    if (typeof err == 'string')
      reason = err
    else if (err && err.code == 'ENOTFOUND')
      reason = 'Network error'
    else if (body && body.error)
      reason = body.error.message
    else if (body && body.fail)
      reason = body.fail
    else
      reason = this.unhandled_error(err, resp, body)

    this.reject(reason)
  }

  unhandled_error(err, resp, body) {
    let reason = 'Unhandled error via reject.js'

    new ErrorHandler({reason, filename: this.filename, err, resp, body})

    return `${reason}: See error.log for details`
  }

}
