electron = require('electron')

addEventListener('DOMContentLoaded', function () {

  const
    win                   = electron.remote.getCurrentWindow(),
    bounds                = win.getBounds(),
    screen_width          = electron.screen.getPrimaryDisplay().bounds.width,
    screen_height         = electron.screen.getPrimaryDisplay().bounds.height,
    ghost_regular_height  = set_ghost_regular_height(),
    is_modifier_key       = e => e.altKey  || e.metaKey || e.ctrlKey || e.shiftKey
    is_special_key        = e => e.key != 'Space' && e.key.length > 1
    ghost_grew            = () => ghost.offsetHeight > ghost_regular_height,
    change_spaces_to_nbsp = () => ghost.innerHTML = ghost.innerHTML.replace(/ /g, '&nbsp;')

  input.style.width = input.offsetWidth
  ghost.style.width = input.offsetWidth - 20
  input.onpaste     = process_paste
  input.oninput     = process_input
  onkeydown         = process_keydown
  form.onsubmit     = process_submit

  input.focus()
  onblur = close

  function set_ghost_regular_height() {
    let result
    ghost.innerText = ' '
    result = ghost.offsetHeight + 13
    ghost.innerText = ''
    return result
  }

  function process_keydown(e) {
    if      (e.key == 'Escape')                       close()
    else if (e.key == 'Enter' && !is_modifier_key(e)) form.onsubmit()
    else if (!add_width && !add_height)               return
    else if (e.key == 'Enter' && e.shiftKey)          full_size()
    else if (is_special_key(e) || is_modifier_key(e)) return
    else    process_regular_key(e)
  }

  function process_regular_key(e) {
    ghost.innerHTML += e.key
    check_size()
  }

  function process_submit() {
    electron.ipcRenderer.send('async', input.value)
    close()
  }

  function check_size() {
    if (ghost_grew() && add_width)
      add_width()

    if (!add_width && ghost_grew())
      add_height()
  }

  function add_width() {
    bounds.width      = screen_width - bounds.x
    win.setBounds(bounds)
    input.style.width = bounds.width - 10
    ghost.style.width = 'calc(100% - 20px)'
    add_width = null
  }

  function add_height() {
    input.classList.add('multiline')
    bounds.height      = screen_height / 4
    input.style.height = bounds.height
    win.setBounds(bounds)
    input.onpaste = null
    input.oncut   = null
    input.oninput = null
    add_height    = null
  }

  function full_size() {
    add_width()
    add_height()
  }

  function process_paste(e) {
    const data = e.clipboardData.getData('Text')

    if (data.includes('\n')) {
      full_size()
    } else {
      ghost.innerText += data
      check_size()
    }
  }

  function process_input(e) {
    ghost.innerText = input.value
    change_spaces_to_nbsp()
  }

})
