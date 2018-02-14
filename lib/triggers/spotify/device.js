module.exports = class {

  constructor(resolve, reject) {
    this.resolve  = resolve
    this.reject   = reject
    this.method   = 'GET'
    this.endpoint = 'devices'
    new CT.triggers.sp.PlayerRequest(this)
  }

  async success(response, that) {
    that.devices = response.devices

    if (that.name)
      return that.transfer_playback(that)
    else
      return `Devices available: ${response.devices.map(device => device.name).join(', ')}`
  }

  async transfer_playback(that) {
    const transfer_result = await new CT.triggers.sp.TransferDevice(that)

    if (transfer_result.requested_device)
      return `Transfered playback to ${transfer_result.requested_device.name}`
  }

  get name() {
    return CT.electron.clipboard.readText().toLowerCase().split(' ')[2]
  }

}
