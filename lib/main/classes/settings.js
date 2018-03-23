module.exports = class {

  set(key, value, that) {

    if (that) {
      const real_value = {}
      real_value[key]  = value
      CT.vendor.settings.set(that.name, real_value)
    } else {
      CT.vendor.settings.set(key, value)
    }

  }

  get(key) {
    return CT.vendor.settings.get(key)
  }

}
