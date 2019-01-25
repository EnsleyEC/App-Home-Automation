////////////////// Models/Device.js
// Truncated, just important stuff...
export const sendCommand = (device: Object, cmd: string, val: string, socket: Object) => {
    let msg = cmd + ',' + val
    let chars = map(msg, function (char) { return char.charCodeAt(0) })
    chars.push(0)
    // wifi
    // if (device.connectionStatus != 'connected') {
    //   return
    // }
    socket.write(msg, cb=(() => {
      // console.log('msg sent: ' + msg + ' to ' + device.id)
    }))
  }
  
  export const receiveCommand = (data: string) => {
    let cmd = data
    cmd = cmd.trim().split(',')
    // This is just the structure of my commands, but leaving as an example
    var evt = cmd[0][0]
    var color = colorCodes[cmd[1]]
    var timestamp = parseInt(cmd[2], 10)
  
    return {evt, timestamp, color}
  }
  // Truncated...