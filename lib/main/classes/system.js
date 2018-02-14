module.exports = class {

  description() {
    if (os.type() == 'Darwin') {
      const
        system_info      = child_process.execSync('system_profiler SPHardwareDataType').toString(),
        system_info_json = yamljs.parse(system_info),
        model            = system_info_json.Hardware['Hardware Overview']['Model Name'],
        serial_number    = system_info_json.Hardware['Hardware Overview']['Serial Number (system)']

      return `${model}: ${serial_number}`
    }

    return 'Unknown'
  }

}
