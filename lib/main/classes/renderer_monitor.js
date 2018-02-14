module.exports = class {

  constructor() {

    CT.electron.ipcMain.on('async', (event, arg) => {
      log(`Received window communication from '${event.sender.browserWindowOptions.name}': ${arg}`)
    })

  }

}
