module.exports = class {

  constructor() {
    this.items = CT.electron.Menu.buildFromTemplate(this.menu)
  }

  get menu() {
    return [
      { label: 'Preferences',     accelerator: 'P', click() { new CT.Prefs          } },
      { label: 'Account',         accelerator: 'A', click() { new CT.Account        } },
      { label: 'Instant Trigger', accelerator: 'I', click() { new CT.InstantTrigger } },
      { label: 'To Dos',          accelerator: 'T', click() { CT.Todos.init()       } },
      { label: 'Quit',            accelerator: 'Q', selector: 'terminate:'             }
    ]
  }

}
