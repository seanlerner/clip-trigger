module.exports = class {

  constructor() {
    this.items = CT.electron.Menu.buildFromTemplate(this.menu)
  }

  get menu() {
    return [
      { label: 'About',       accelerator: 'A', click() { new CT.About            } },
      { label: 'Preferences', accelerator: 'P', click() { new CT.Prefs            } },
      { label: 'Account',     accelerator: 'C', click() { new CT.Account          } },
      { label: 'Triggers',    accelerator: 'T', click() { new CT.TriggerDirectory } },
      { label: 'Quit',        accelerator: 'Q', selector: 'terminate:'            }
    ]
  }

}
