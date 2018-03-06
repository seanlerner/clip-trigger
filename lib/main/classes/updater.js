module.exports = class {

  constructor() {
    this.update_check()
  }

  update_check() {
    log('Checking for update ...')
    log(`Current version: ${CT.package.version}`)

    const
      url     = 'https://api.github.com/repos/seanlerner/clip-trigger/releases/latest',
      headers = { 'User-Agent': 'ClipTrigger' },
      options = { url, headers }

    CT.vendor.request.get(options, this.update_check_response.bind(this))
  }

  update_check_response(err, resp, body) {
    const latest_version = JSON.parse(body).name

    log(`Latest version:  ${latest_version}`)

    if (CT.package.version == latest_version)
      log(`${CT.package.nice_name} is up-to-date`)
    else
      this.update()
  }

  update() {
    log(`Updating ${CT.package.nice_name}`)

    const updater = CT.vendor.electron_updater.autoUpdater

    updater.on('checking-for-update', () => {
      log('Checking for update...')
    })

    updater.on('update-available', (info) => {
      log('Update available.')
    })

    updater.on('update-not-available', (info) => {
      log('Update not available.')
    })

    updater.on('error', (err) => {
      log('Error in auto-updater. ' + err)
    })

    updater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')'
      log(log_message)
    })

    updater.on('update-downloaded', (info) => {
      log('Update downloaded')
    })

    updater.logger = CT.vendor.electron_log
    updater.logger.transports.file.level = 'debug'
    updater.checkForUpdatesAndNotify()
  }

}
