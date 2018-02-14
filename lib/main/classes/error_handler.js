module.exports = class {

  constructor(err_obj) {
    this.err_obj  = err_obj
    this.filepath = `${process.env.HOME}/Library/logs/clip/error.log`

    this.create_error_log_file_if_necessary()
    this.log_full_error()
    CT.log.error(`${err_obj.reason}: See error.log for details`)
    this.teardown()
  }

  create_error_log_file_if_necessary() {
    if (!fs.existsSync(this.filepath))
      fs.closeSync(fs.openSync(this.filepath, 'w'))
  }

  log_full_error() {
    this.log()
    this.line('=')
    this.log_reason()
    this.line('=')
    this.log_date()
    this.log_env()
    this.log_file()
    this.log_err()
    this.log_body()
    this.log_resp()
    this.log_stack()
    console.log()
    console.log(CT.vendor.chalk.redBright('error.log may contain more details'))
    this.line('=')
    console.log()
  }

  log(str = '') {
    console.error(CT.vendor.chalk.redBright(str))
    fs.appendFileSync(this.filepath, str + '\n')
  }

  line(char) {
    this.log(char.repeat(80))
  }

  log_reason() {
    this.log(this.err_obj.reason)
  }

  log_date() {
    const env = CT.config ? CT.config.env : 'Unknown'
    this.log('Date:'.padEnd(10) + Date())
  }

  log_env() {
    const env = CT.config ? CT.config.env : 'Unknown'
    this.log('Env:'.padEnd(10) + env)
  }

  log_file() {
    const filename = this.err_obj.filename ? path.basename(this.err_obj.filename) : 'n/a'
    this.log('File:'.padEnd(10) + filename)
  }

  log_err() {
    const err = this.err_obj.err || 'n/a'
    this.log('Error:'.padEnd(10) + err)
  }

  log_body() {
    if (!this.err_obj.body) return
    this.log('Body:'.padEnd(10) + `${this.err_obj.body.statusCode} / ${this.err_obj.body.statusMessage}`)
  }

  log_resp() {
    if (!this.err_obj.resp) return
    this.log('Response:'.padEnd(10) + this.err_obj.resp)
  }

  log_stack() {
    if (!this.err_obj.err) return
    this.line('-')
    this.log('Stack:')
    this.log(this.err_obj.err.stack)
  }

  shorten(str) {
    let modification

    if (str.includes('\n')) {
      modification = ` ... cut ${str.match(/\n/g).length} lines`
      str = str.split('\n')[0].slice(0, 60) + modification
    } else if (str.length > 80) {
      modification = ` ... cut ${str.length - 80} chars` + modification
      str = str.slice(0, 80) + modification
    }

    return str
  }

  teardown() {
    if (process.env.CT_DEBUGGER_ON_CRASH) {
      console.log('Paused in debugger')
      debugger
      return
    }

    process.exit(1)
  }

}
