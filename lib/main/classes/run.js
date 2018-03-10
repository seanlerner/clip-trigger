module.exports = class {

  constructor(trigger, args) {
    this.trigger = trigger
    this.args    = args
    return this.start()
  }

  start() {
    log(`Run: ${this.trigger.trigger} with args: ${this.args}`)

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
    this.result  = result
    this.outcome = 'success'
    this.notify()
    log(`Resolved: ${result}`)
  }

  fail(result) {
    this.result  = result
    this.outcome = 'fail'
    this.notify()
    log.error(`Rejected: ${result}`)
  }

  notify() {
    new CT.Notify(this)
  }

}
