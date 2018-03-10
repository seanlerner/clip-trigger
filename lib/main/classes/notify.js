module.exports = class {

  constructor(run) {
    this.run    = run
    this.result = run.result
    this.create_obj()
    this.notify()
  }

  create_obj() {
    this.obj = {}
    this.add_defaults()
    this.add_result()
  }

  add_defaults() {
    this.obj.silent = true
  }

  add_result() {
    switch (typeof this.result) {
      case 'string':
        this.add_attrs_from_string()
        break
      case 'object':
        this.add_attrs_from_object()
        break
      default:
        this.error()
    }
  }

  add_attrs_from_string() {
    this.obj.title = this.run.trigger.nice_name
    this.obj.body  = this.result
  }

  add_attrs_from_object() {
    this.obj.title    = this.result.title
    this.obj.subtitle = this.result.subtitle
    this.obj.body     = this.result.body
    this.obj.icon     = this.result.icon
  }

  add_fail_icon_if_fail() {
    if (this.run.outcome == 'fail')
      this.obj.icon = path.join(CT.dir.img, 'red.png')
  }

  notify() {
    new CT.electron.Notification(this.obj).show()
  }

  error() {
    const reason   = 'Unhandled situation in notify.',
          filename = __filename

    new ErrorHandler({ reason, filename })
  }

}
