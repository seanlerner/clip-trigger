module.exports = class {

  constructor(err_obj) {
    try {
      this.handle_err(err_obj)
    } catch(err_handler_err) {
      this.error_handler_error(err_handler_err, err_obj)
    }
  }

  handle_err(err_obj) {
    this.err_obj  = err_obj
    this.lines    = []

    this.log_regular_log()
    this.log_full_error()
    this.write_file()
    this.append_item_to_renderer_log()

    if (err_obj.handled || CT.config.env == 'prod')
      return

    process.exit(1)
  }

  log_regular_log() {
    log.error(`${this.err_obj.reason}: ${this.err_obj.err}. error.log may contain more details`)
  }

  log_full_error() {
    console.log()
    this.line('=')
    this.log_reason()
    this.line('-')
    this.log_date()
    this.log_env()
    this.log_file()
    this.log_err()
    this.log_shortened_resp()
    this.log_body()
    this.log_stack()
    this.log_full_resp()
    this.line('=')
    console.log()
  }

  log(str = '') {
    console.error(CT.vendor.chalk.magentaBright(str))
    this.lines.push(str + '\n')
  }

  log_attr(attr, str) {
    this.log((attr + ':').padEnd(20) + str)
  }

  line(char) {
    this.log(char.repeat(80))
  }

  log_reason() {
    this.log(this.err_obj.reason)
  }

  log_date() {
    this.log_attr('Date', Date())
  }

  log_env() {
    const env = CT.config ? CT.config.env : 'unknown'
    this.log_attr('Env', env)
  }

  log_file() {
    const filename = this.err_obj.filename ? path.basename(this.err_obj.filename) : 'unknown'
    this.log_attr('File', filename)
  }

  log_err() {
    const err = this.err_obj.err || 'unknown'
    this.log_attr('Error', err)
  }

  log_shortened_resp() {
    if (!this.err_obj.resp) return
    this.log_attr('Response', this.shorten(this.err_obj.resp))
  }

  log_body() {
    if (!this.err_obj.body) return
    this.log('Body:')
    this.log_attr('  Status code',    this.err_obj.body.statusCode)
    this.log_attr('  Status message', this.err_obj.body.statusMessage)
    this.log_attr('  Content',        this.shorten(this.err_obj.body.body))
  }

  log_stack() {
    if (!(this.err_obj.err && this.err_obj.err.stack)) return
    this.line('-')
    this.log('Stack:')
    this.log()
    this.log(this.err_obj.err.stack)
  }

  log_full_resp() {
    if (!this.err_obj.resp) return
    this.line('-')
    this.log('Full Response:')
    this.log()
    this.log(CT.vendor.prettyoutput(this.err_obj.resp))
  }

  write_file() {
    this.create_error_log_file_if_necessary()
    fs.appendFileSync(this.filepath, this.lines_joined + '\n')
  }

  create_error_log_file_if_necessary() {
    if (!fs.existsSync(this.filepath))
      fs.closeSync(fs.openSync(this.filepath, 'w'))
  }

  get filepath() {
    return path.join(CT.dir.logs, 'error.log')
  }

  get lines_joined() {
    return this.lines.join('')
  }

  shorten(str) {
    let modification

    if (str.includes('\n')) {
      modification = ` ... cut ${str.match(/\n/g).length} lines`
      str = str.split('\n')[0].slice(0, 60) + modification
    } else if (str.length > 80) {
      modification = ` ... cut ${str.length - 50} chars`
      str = str.slice(0, 50) + modification
    }

    return str
  }

  append_item_to_renderer_log(msg) {
    if (CT.logs && CT.logs.win)
      CT.logs.win.send(`append_item_to_error_log`, this.lines_joined)
  }

  error_handler_error(err_handler_err, err_obj) {
    console.log("Oh dear, error handler can't handle error!")
    console.log('Error Handler Error:')
    console.log(err_handler_err)
    console.log('Original Error:')
    console.log(err_obj)
  }

}
