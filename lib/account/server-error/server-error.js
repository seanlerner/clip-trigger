request  = require('request')
settings = require('electron-settings')

clear_flash = () => flash.innerText = ''

email.innerText = settings.get('email')

logout.addEventListener('click', function(e) {
  e.preventDefault()
  settings.set('password', '')
  window.close()
})
