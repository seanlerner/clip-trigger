module.exports = class {

  constructor() {
    this.trigger = 'te'
    this.name    = 'Test Trigger'
  }

  run(trigger_run) {

    const
      args      = trigger_run.args.split(' '),
      first_arg = args.shift()

    switch (first_arg) {
      case 'are_you_there?':
        trigger_run.resolve('I am here.')
        break
      case 'reload':
        const trigger = args.pop() + '-trigger'
        CT.triggers.setup_trigger(trigger)
        trigger_run.resolve(trigger + ' reloaded')
        break
      default:
        trigger_run.reject(`Unknown ct command: ${args.join(' ')}`)
    }

  }

}
