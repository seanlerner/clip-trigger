// Ensure only one instance of Clip Trigger is running
CT.already_running = CT.electron.app.makeSingleInstance(() => {
  log.error(`Another ${CT.package.nice_name} app instance was attempted`)
})

if (CT.already_running) {
  console.error(`${CT.package.nice_name} is already running, exiting.`)
  CT.electron.app.quit()
  return
}
