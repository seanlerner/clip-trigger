const { ipcRenderer, remote } = require('electron')

addEventListener('DOMContentLoaded', () => {

  const directory_file = remote.app.CT.config.triggers_dir + '/clip-trigger-directory/directory.json'
  const directory = JSON.parse(remote.app.CT.node.fs.readFileSync(directory_file, 'UTF-8'))

  Object.entries(directory).forEach(obj => {
    console.log(obj[0])
    uninstalled.append(obj[0] + '\n')
  })

})
