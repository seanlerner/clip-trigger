module.exports = class {

  get content() {
    return CT
           .electron
           .clipboard
           .readText(String)
           .substring(2)
           .trim()
  }

}

