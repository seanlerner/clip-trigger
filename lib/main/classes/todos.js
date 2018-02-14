module.exports = class {

  constructor() {
    if (CT.Todos.win) {
      CT.Todos.win.focus()
      return
    }

   this.win = new CT.electron.BrowserWindow({width: 800, height: 600, name: 'To Dos'})

    this.win.loadURL(url.format({
      pathname: CT.dir + 'lib/todos/todos.html',
      protocol: 'file:',
      slashes: true
    }))

    this.win.on('close', () => this.win = null)
  }

}
