module.exports = class {

  constructor(trigger, args) {
    this.trigger = trigger
    this.args    = args
    return this.start()
  }

  start() {
    log(`Run: ${this.trigger.trigger} with args: ${this.args}`)

    this.timeout_id = setTimeout(this.timeout.bind(this), 5000)

    return new Promise(this.run.bind(this))
      .then(this.success.bind(this))
      .catch(this.fail.bind(this))
  }

  run(resolve, reject) {
    this.resolve = resolve
    this.reject  = reject
    this.trigger.run(this)
  }

  success(result) {
    this.finish(result, 'success')
  }

  fail(result) {
    this.finish(result, 'fail')
  }

  timeout() {
    this.reject('timeout')
  }

  finish(result, outcome) {
    clearTimeout(this.timeout_id)
    this.result  = result
    this.outcome = outcome
    log(`${this.outcome}: ${this.log_msg}`)
    new CT.Notify(this)
  }

  get log_msg() {
    if (typeof this.result == 'object')
      return single_line_str(this.result)
    else if (typeof this.result == 'string')
      return this.result
    else
      return 'trigger run finished'
  }

}
