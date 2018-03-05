module.exports = class {

  constructor() {
    this.previous_clipboard_content = CT.electron.clipboard.readText(String)
    this.start_clipboard_monitor()
  }

  start_clipboard_monitor() {
    CT.log.debug('Starting clipboard monitor')
    this.interval = setInterval(this.check.bind(this), 300)
  }

  stop_clipboard_monitor() {
    CT.log.debug('Stopping clipboard monitor')
    clearInterval(this.interval)
  }

  check() {
    const clipboard_content = CT.electron.clipboard.readText(String)

    CT.log.debug(`Current clipboard content:  '${clipboard_content}'`)
    CT.log.debug(`Previous clipboard content: '${this.previous_clipboard_content}'`)

    if (clipboard_content != this.previous_clipboard_content) {
      const type = clipboard_content.substring(0, 2)

      if (CT.triggers.hasOwnProperty(type))
        this.run(type)
      else
        this.previous_clipboard_content = clipboard_content
    }

  }

  run(type) {
    this.stop_clipboard_monitor()
    this.restore_previous_clipboard = true
    this.current_trigger = CT.triggers[type]

    const trigger = this.current_trigger

    log(`Run: ${trigger.trigger} with args: ${CT.clipboard.content}`)

    CT.tray.notice(type)

    new Promise(trigger.run.bind(trigger))
      .then(this.success.bind(this))
      .catch(this.fail.bind(this))
      .then(this.start_clipboard_monitor.bind(this))
  }

  success(result) {
    this.possibly_restore_previous_clipboard()
    log(`Resolved: ${result}`)
    CT.tray.success(this.success_options(result))
  }

  success_options(result) {
    if (typeof result == 'string')
      return { title: this.current_trigger.nice_name,  body: result }
    else
      return result
  }

  fail(reason) {
    this.possibly_restore_previous_clipboard()
    log(`Rejected: ${reason}`)
    CT.tray.fail(reason)
  }

  possibly_restore_previous_clipboard() {
    if (this.restore_previous_clipboard) {
      CT.log.debug(`Restoring clipboard to '${this.previous_clipboard_content}'`)
      CT.electron.clipboard.writeText(this.previous_clipboard_content)
    } else {
      CT.log.debug(`Not restoring clipboard to '${this.previous_clipboard_content}'`)
    }
  }

}
