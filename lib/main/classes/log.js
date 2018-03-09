module.exports = class {

  constructor() {
    this.setup_file()
    this.setup_console()
  }

  setup_file() {
    CT.vendor.electron_log.transports.console.level = 'debug'
    CT.vendor.electron_log.transports.file.level    = true
    CT.vendor.electron_log.transports.file.format   = this.file_format
  }

  setup_console() {
    CT.vendor.electron_log.transports.console = this.console.bind(this)
  }

  error   (msg) { CT.vendor.electron_log.error(msg)   }
  warn    (msg) { CT.vendor.electron_log.warn(msg)    }
  info    (msg) { CT.vendor.electron_log.info(msg)    }
  verbose (msg) { CT.vendor.electron_log.verbose(msg) }
  debug   (msg) { CT.vendor.electron_log.debug(msg)   }
  silly   (msg) { CT.vendor.electron_log.silly(msg)   }

  console(msg) {
    console.log(this.colour(msg))
    this.append_item_to_renderer_log('regular', msg)
  }

  colour(msg) {
    return CT.vendor.chalk[this.colours[msg.level]](msg.data)
  }

  get colours() {
    return {
      error:   'redBright',
      warn:    'yellow',
      info:    'white',
      verbose: 'magento',
      debug:   'cyan',
      silly:   'blue'
    }
  }

  get file_format() {
    return '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}'
  }

  append_item_to_renderer_log(log_type, msg) {
    if (CT.logs && CT.logs.win)
      CT.logs.win.send(`append_item_to_${log_type}_log`, this.like_file_format(msg))
  }

  like_file_format(msg) {
    const
      date      = msg.date,
      pad       = this.pad,
      formatter = CT.vendor.electron_log.transports.file.format

    return formatter
      .replace('{level}', msg.level)
      .replace('{text}',  msg.data)
      .replace('{y}',     date.getFullYear())
      .replace('{m}',     pad(date.getMonth() + 1))
      .replace('{d}',     pad(date.getDate()))
      .replace('{h}',     pad(date.getHours()))
      .replace('{i}',     pad(date.getMinutes()))
      .replace('{s}',     pad(date.getSeconds()))
      .replace('{ms}',    pad(date.getMilliseconds(), 3))
  }

  pad(number, zeros) {
    zeros = zeros || 2
    return number.toString().padStart(zeros, '0')
  }

}
