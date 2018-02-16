child_process = require('child_process')
os            = require('os')
electron      = require('electron')
request       = require('request')
settings      = require('electron-settings')
os            = require('os')
yamljs        = require('yamljs')

clear_flash = () => flash.innerText = ''

form    .addEventListener('submit', login)
email   .addEventListener('focus',  clear_flash)
password.addEventListener('focus',  clear_flash)
submit  .addEventListener('focus',  clear_flash)

function login(e) {
  e.preventDefault()
  form_disable(true)
  setup_wait_msg()
  post()
}

function post() {

  post_data = {
    email:       email.value,
    password:    password.value,
    description: electron.remote.app.CT.system.description()
  }

  request.post(
    electron.remote.app.CT.config.clip_trigger_server + 'api/tokens',
    { json: post_data },
    process_response
  )
}

function process_response(error, response, body) {
  const outcome = document.createElement('span')

  result = { error, response, body, outcome }

  if (body && body.success)
    process_success(result)
  else
    process_fail(result)

  flash.appendChild(outcome)
}

function process_success(result) {
  settings.set('email',              email.value)
  settings.set('clip_trigger_token', result.body.success)
  result.outcome.innerText = 'Logged in'
  result.outcome.classList.add('green')
  setTimeout(() => window.close(), 1000)
}

function process_fail(result) {

  if (result.body && result.body.fail)
    result.outcome.innerText = result.body.fail
  else if (result.error)
    result.outcome.innerText = result.error.message
  else if (result.response)
    result.outcome.innerText = `${result.response.statusCode} ${result.response.statusMessage}`
  else
    result.outcome.innerText = 'unhandled error'

  result.outcome.classList.add('red')
  form_disable(false)
}

function form_disable(bool) {
  email   .disabled = bool
  password.disabled = bool
  submit  .disabled = bool
}

function setup_wait_msg() {
  const wait_msg     = document.createElement('span')
  wait_msg.innerText = 'Checking login credentials ... '
  flash.appendChild(wait_msg)
}
