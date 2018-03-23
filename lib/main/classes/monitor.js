module.exports = class {

  constructor() {
    this.previous_content = CT.clipboard.content
    this.start()
  }

  start() {
    log.debug('Starting clipboard monitor')
    this.interval = setInterval(this.check.bind(this), CT.config.check_interval)
  }

  stop() {
    log.debug('Stopping clipboard monitor')
    clearInterval(this.interval)
  }

  check() {
    if (this.content_has_not_changed())
      return

    this.run_if_trigger()
    this.previous_content = CT.clipboard.content
  }

  content_has_not_changed() {
    return CT.clipboard.content == this.previous_content
  }

  run_if_trigger() {
    const type = CT.clipboard.first_two_chars

    if (this.is_trigger(type) &&
       (
        CT.clipboard.third_char == ' '     ||
        CT.clipboard.third_char == '\n'    ||
        CT.clipboard.content.length == 2)
       )
      this.run(type)
  }

  is_trigger(type) {
    return CT.triggers.hasOwnProperty(type)
  }

  async run(type) {
    const trigger = CT.triggers[type],
          args    = CT.clipboard.args

    this.restore_clipboard()
    this.stop()
    CT.tray.notice()
    await new CT.Run(trigger, args)
    CT.tray.default_icon()
    this.start()
  }

  restore_clipboard() {
    CT.electron.clipboard.writeText(this.previous_content)
  }

}
