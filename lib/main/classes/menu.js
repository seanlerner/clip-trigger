module.exports = class {

  constructor() {
    this.items = CT.electron.Menu.buildFromTemplate(this.menu)
  }

  get menu() {
    return [
      { label: 'Preferences',        accelerator: 'P', click() { new CT.Prefs            } },
      { label: 'Account',            accelerator: 'A', click() { new CT.Account          } },
      { label: 'Triggers Directory', accelerator: 'T', click() { new CT.TriggerDirectory } },
      { label: 'Quit',               accelerator: 'Q', selector: 'terminate:'            }
    ]
  }

}
