module.exports = class {

  constructor() {
    this.trigger = 'ct'
  }

  run(resolve, reject) {

    const content = CT.clipboard.content

    switch (content) {
      case 'a':
        new CT.Account
        resolve('Opening Account')
        break
      case 'p':
        new CT.Prefs
        resolve('Opening Preferences')
        break
      case 'q':
        process.exit()
        resolve('Exiting')
        break
      default:
        reject(`Unknown ct command: ${content}`)
    }

  }

}
