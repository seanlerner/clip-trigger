module.exports = class {

  constructor(fn, resolve, reject) {
    this.fn      = fn
    this.resolve = resolve
    this.reject  = reject
    this.try_first_time()
  }

  try_first_time() {
    new this.fn(this.resolve, this.refresh_and_try_again.bind(this))
  }

  refresh_and_try_again(err, res, body) {
    if (['The access token expired', 'Invalid access token'].includes(err))
      new CT.triggers.sp.RefreshAccessToken(
        this.try_second_time.bind(this),
        this.final_reject.bind(this)
      )
    else
      this.final_reject(err, res, body)
  }

  try_second_time() {
    new this.fn(this.resolve, this.final_reject.bind(this))
  }

  final_reject(err, res, body) {
    new CT.Reject(this.reject, err, res, body, __filename)
  }

}
