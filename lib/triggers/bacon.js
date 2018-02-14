module.exports = class {

  constructor() {
    this.trigger = 'bc'
  }

  run(resolve, reject) {
    const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text'

    CT.vendor.request(url, (err, body, res) => {
      if (body && body.statusCode == 200) {
        CT.electron.clipboard.writeText(res)
        CT.clipboard_monitor.restore_previous_clipboard = false
        resolve('Bacon Ipsum Ready!')
      } else {
        new CT.Reject(reject, err, res, body, __filename)
      }

    })

  }

}
