module.exports = class {

  constructor(that) {
    this.resolve          = that.resolve
    this.reject           = that.reject
    this.devices          = that.devices
    this.name             = that.name
    this.requested_device = this.find_device()
    this.success          = () => {}

    if (this.requested_device)
      this.transfer_device()
    else
      this.reject(`Can't find device ${this.name}`)
  }

  transfer_device() {
    this.method = 'PUT'
    this.body   = JSON.stringify({ device_ids: [this.requested_device.id] })

    new CT.triggers.sp.PlayerRequest(this)
  }

  find_device() {
    return this.devices.find(device => device.name.toLowerCase().includes(this.name))
  }

}
