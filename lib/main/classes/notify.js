module.exports = class {

  constructor(run) {
    this.result  = run.result
    this.outcome = run.outcome
    this.name    = run.trigger.nice_name
    const obj    = this.create_notification_obj()
    obj.silent   = true
    new CT.electron.Notification(obj).show()
  }

  create_notification_obj() {
    if (this.result == 'timeout')
      return this.timeout
    else if (typeof this.result == 'string')
      return this.string
    else if (typeof this.result == 'object')
      return this.object
    else
      return this.undefined
  }

  get string() {
    return {
      title: this.name,
      body:  this.result
    }
  }

  get object() {
    return {
      title:    this.result.title,
      subtitle: this.result.subtitle,
      body:     this.result.body,
      icon:     this.result.icon
    }
  }

  get undefined() {
    return {
      title: this.name,
      body:  this.outcome
    }
  }

  get timeout() {
    return {
      title:    this.name + ' timeout',
      subtitle: 'Error',
      body:     'error.log may have more details',
      icon:     path.join(CT.dir.img, 'red.png')
    }
  }

}
