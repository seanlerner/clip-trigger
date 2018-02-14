request  = require('request')
settings = require('electron-settings')

addEventListener('DOMContentLoaded', () => {

  email.innerText = settings.get('email')
  token.innerText = settings.get('clip_trigger_token')

  logout.addEventListener('click', function(e) {
    e.preventDefault()
    settings.set('email',              '')
    settings.set('clip_trigger_token', '')
    window.close()
  })

})
