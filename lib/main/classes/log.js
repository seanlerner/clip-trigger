module.exports = class {

  constructor() {
    CT.vendor.electron_log.transports.file.level     = true

    if (process.stdout.isTTY || process.env.CT_TTY)
      CT.vendor.electron_log.transports.console.format = '{text}'
    else
      CT.vendor.electron_log.transports.console.level = false
  }

  info(data) {
    let data_to_log

    if (data.length > 1)
      data_to_log = JSON.stringify(data)
    else
      data_to_log = data[0]

    CT.vendor.electron_log.info(data_to_log)
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

  }

  error(data) {
    CT.vendor.electron_log.error(data)
  }

}
