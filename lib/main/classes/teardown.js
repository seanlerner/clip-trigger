module.exports = class {

  constructor() {
    process.on('SIGTERM', () => this.exec('Received terminate signal.'))
  }

  exec(reason) {
    log('Shutting down: ' + reason)
    process.exit()
  }

}
