// Logging
// log         = (...data) => CT.log.info(data)

// log =
//   function(msg) {
//     CT.log.info(msg)
//     this.warn = function () {
//       CT.log.warn(msg)
//     }
//   }

log = function log(msg) {

    CT.log.info(msg)

    function warn(msg) {
      CT.log.warn(msg)
    }

    function info(msg) {
      CT.log.info(msg)
    }

  log.warn = warn
  log.info = info
}


function initValidation() {

    function validate(_block) {
      console.log( "test", _block )
    }

  initValidation.validate = validate
}


      initValidation()
      initValidation.validate( "hello" )


log_success = (...data) => CT.log.success(data)

// Settings
clip_trigger_credentials = () => {
  return {
    email:              CT.vendor.settings.get('email'),
    clip_trigger_token: CT.vendor.settings.get('clip_trigger_token')
  }
}

// JSON helpers
single_line_str = obj =>
  JSON.stringify(obj).replace(/\\n|\\|  /g, '')

is_json = str => {
  try { return JSON.parse(str) }
  catch (_) { }
}
