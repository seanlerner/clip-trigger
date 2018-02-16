electron = require('electron')
request  = require('request')
settings = require('electron-settings')

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
    electron.remote.app.CT.config.clip_trigger_server + 'api/users',
    { json: post_data },
    process_response
  )
}

function process_response(error, _response, body) {

  const outcome = document.createElement('span')

  if (body && body.success)
    process_success(outcome, body)
  else
    process_fail(outcome, body, error)

  flash.appendChild(outcome)
}

function process_success(outcome, body) {
  settings.set('email',    email.value)
  settings.set('clip_trigger_token', body.success)
  outcome.innerText = 'success!'
  outcome.classList.add('green')
  setTimeout(window.close, 2000)
}

function process_fail(outcome, body, error) {

  if (body && body.fail) {

    const errs = []

    if (body.fail.email && body.fail.email[0])
      errs.push(`email ${body.fail.email[0]}`)

    if (body.fail.password && body.fail.password[0])
      errs.push(`password ${body.fail.password[0]}`)

    outcome.innerText = errs.join(', ')
  }
  else if (error && error.code == "ENOTFOUND")
    outcome.innerText = 'network error'
  else
    outcome.innerText = 'unknown error: ' + { body, error }

  outcome.classList.add('red')
  form_disable(false)
}

function form_disable(bool) {
  email   .disabled = bool
  password.disabled = bool
  submit  .disabled = bool
}

function setup_wait_msg() {
  const wait_msg     = document.createElement('span')
  wait_msg.innerText = 'Creating account ... '
  flash.appendChild(wait_msg)
}
