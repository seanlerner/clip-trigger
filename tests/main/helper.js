module.exports = class {

  get current_time() {
    return /\d\d:\d\d:\d\d/.exec(Date())[0]
  }

  log(str) {
    console.log(chalk.blue(str))
  }

  err(str) {
    console.log(chalk.redBright(str))
  }

  clear_screen() {
    console.log('\x1Bc')
  }

  clipboard_write(str) {
    const pbcopy = child_process.spawn('pbcopy')
    pbcopy.stdin.write(str)
    pbcopy.stdin.end()
  }

  colourize(result_type, str) {
    const result_types = {
      Pass:    chalk.green,
      Fail:    chalk.redBright,
      Timeout: chalk.yellow
    }

    return result_types[result_type](str)
  }

}
