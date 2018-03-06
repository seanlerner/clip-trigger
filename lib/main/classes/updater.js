module.exports = class {

  constructor() {
    this.update_check()
  }

  update_check() {
    log('Checking if update available.')
    log(`Current version: ${CT.package.version}`)

    const
      url     = 'https://api.github.com/repos/seanlerner/clip-trigger/releases/latest',
      headers = { 'User-Agent': 'ClipTrigger' },
      options = { url, headers }

    CT.vendor.request.get(options, this.update_check_response.bind(this))
  }

  update_check_response(err, resp, body) {
    if (err) {
      this.error_checking_for_update(err)
      return
    }

    const latest_version = JSON.parse(body).name

    log(`Latest version:  ${latest_version}`)

    if (CT.package.version == latest_version)
      log(`${CT.package.nice_name} is up-to-date`)
    else
      this.update()
  }

  update() {
    log(`Beginning auto-update`)

    const updater = CT.vendor.electron_updater.autoUpdater

    updater.on('checking-for-update',  this.checking_for_update)
    updater.on('update-available',     this.update_available)
    updater.on('update-not-available', this.update_not_available)
    updater.on('error',                this.error)
    updater.on('download-progress',    this.download_progress)
    updater.on('update-downloaded',    this.update_downloaded)

    updater.logger = CT.vendor.electron_log
    updater.logger.transports.file.level = 'debug'
    updater.checkForUpdatesAndNotify()
  }

  checking_for_update() {
    log('Checking for update.')
  }

  update_available(info) {
    log('Update available.')
    log(info)
  }

  update_not_available(info) {
    log('Update not available.')
    log(info)
  }

  error(err) {
    log('Error in auto-updater. ')
    log(err)
  }

  download_progress(progress) {
    let kbps    = progress.bytesPerSecond / 1000,
        percent = progress.percent

    log(`Downloading: ${kbps}KBps (${percent}%)`)
  }

  update_downloaded(info) {
    log('Update downloaded')
    log(info)
  }

  error_checking_for_update(err) {
    if (err.code == 'ENOTFOUND') {
      log('Network not available. Cannot check for update at this time.')
      return
    }

    const reason = 'Error checking for update.'

    new ErrorHandler({reason, filename: __filename, err})
  }

}
