module.exports = class {

  get first_two_letters() {
    return this.content.substring(0, 2)
  }

  get args() {
    return this.content.substring(2).trim()
  }

  get content() {
    return CT.electron.clipboard.readText(String)
  }

}

