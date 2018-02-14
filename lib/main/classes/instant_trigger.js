module.exports = class {

  constructor() {

    this.win = new CT.electron.BrowserWindow({
      frame:       false,
      height:      50,
      // height:      120, // uncomment to debug
      name:        'Instant Trigger',
      transparent: true,
      width:       300,
      x:           CT.tray.tray.getBounds().x - 131,
      y:           0
    })

    this.win.loadURL(url.format({
      pathname: CT.dir + 'lib/instant_trigger/instant_trigger.html',
      protocol: 'file:'
    }))

    this.win.onblur = () => win.close()

    // this.win.openDevTools()
  }

}
