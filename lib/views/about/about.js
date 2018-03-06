const { remote, shell } = require('electron')

update_dom_with_version = () => {
  version.innerText = remote.app.CT.package.version
}

addEventListener('DOMContentLoaded', update_dom_with_version)
