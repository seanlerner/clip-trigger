module.exports = class {

  constructor() {
    CT.vendor.electron_log.transports.file.level = true

    if (process.stdout.isTTY || process.env.CT_TTY)
      CT.vendor.electron_log.transports.console.format = '{text}'
    else
      CT.vendor.electron_log.transports.console.level = false
  }

  info(data) {
    const item = this.format(data)
    this.append_item_to_renderer_log(item, 'regular')
    CT.vendor.electron_log.info(item)
  }

  success(data) {
    const item = this.format(data)
    this.append_item_to_renderer_log(item, 'regular')
    CT.vendor.electron_log.info(CT.vendor.chalk.green(item))
  }

  debug(data) {
    if (!process.env.CT_LOG_DEBUG)
      return

    let modifications = []

    if (data.length > 60) {
      modifications.push('cut')
      data = data.slice(0, 60)
    }

    if (data.includes("\n")) {
      modifications.push('single lined')
      data = single_line_str(data)
    }

    if (modifications.length > 0)
      CT.vendor.electron_log.debug(data, modifications)
    else
      CT.vendor.electron_log.debug(data)

    // TODO
    // const item = this.format(data)
    // this.append_item_to_renderer_log(item, 'regular')


  }

  error(data) {
    CT.vendor.electron_log.error(data)
  }

  format(data) {
    if (typeof data == 'object' && data.length > 1)
      return JSON.stringify(data)
    else if (typeof data == 'object')
      return data[0]
    else
      return data
  }

  append_item_to_renderer_log(item, log_type) {
    if (CT.logs && CT.logs.win)
      CT.logs.win.send(`append_item_to_${log_type}_log`, item)
  }

}
