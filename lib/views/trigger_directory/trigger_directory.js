const fs                = require('fs')
const path              = require('path')
const { remote, shell } = require('electron')
const fs_extra          = require('fs-extra')

addEventListener('DOMContentLoaded', populate_triggers)

let triggers = {}

function populate_triggers() {
  remote.app.CT.vendor.request(
    'https://raw.githubusercontent.com/seanlerner/clip-trigger-directory/master/directory.json',
    add_triggers_from_trigger_directry_and_local
  )
}

function add_triggers_from_trigger_directry_and_local(err, resp, body) {
  if (body)
    triggers = JSON.parse(body)
  else
    error.innerHTML = 'Warning: Unable to download complete triggers directory at this time.'

  fs.readdirSync(remote.app.CT.dir.triggers).forEach(add_trigger_from_local)

  Object.entries(triggers).forEach(add_trigger_to_table)
}

function add_trigger_from_local(id) {
  if (!triggers[id])
    triggers[id] = { name: '', description: '', trigger_code: '', installed: true }
  else
    triggers[id].installed = true
}

function add_trigger_to_table([id, attrs]) {
  available_triggers_table.appendChild(tr_html(id, attrs))
}

function tr_html(id, attrs) {
  const template          = document.createElement('template'),
        install_display   = attrs.installed ? 'none'   : 'inline',
        uninstall_display = attrs.installed ? 'inline' : 'none'

  template.innerHTML =
    `<tr id=${id} data-url=${attrs.url}>
       <td>${attrs.name}</td>
       <td>${attrs.description}</td>
       <td>
         <a class='center install' href="javascript:install_trigger('${id}')" style='display: ${install_display}'>
          Install
        </a>
         <a class='center uninstall' href="javascript:uninstall_trigger('${id}')" style='display: ${uninstall_display}'>
          Uninstall
        </a>
       </td>
       <td>
         <a href="javascript:shell.openExternal('${attrs.url}')">More Info</a>
       </td>
     </tr>`

  return template.content
}

function install_trigger(tr_id) {
  const tr  = document.getElementById(tr_id),
        git = remote.app.CT.vendor.simple_git(remote.app.CT.dir.triggers),
        url = tr.getAttribute('data-url')

  tr.querySelector('.install').style.display   = 'none'
  tr.querySelector('.uninstall').style.display = 'inline'

  git.clone(url, () => {
    remote.app.CT.log.info(`Installed trigger: ${url}`)
    remote.app.CT.triggers.setup_trigger(tr_id)
  })

}

function uninstall_trigger(trigger) {
  const tr           = document.getElementById(trigger),
        trigger_path = path.join(remote.app.CT.dir.triggers, trigger)

  fs_extra.remove(trigger_path)

  tr.querySelector('.uninstall').style.display = 'none'
  tr.querySelector('.install').style.display   = 'inline'

  remote.app.CT.log.info(`Uninstalled trigger: ${trigger_path}`)

  remote.app.CT.triggers.delete(triggers[trigger].trigger_code)
}
