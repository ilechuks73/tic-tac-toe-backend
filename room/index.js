const fileSystem = require('fs')

exports.createRoom = (params) => {
  const rooms = JSON.parse(fileSystem.readFileSync('./data.json').toString())
  let roomID = 'XXXXXX'
  rooms.every((room) => {
    if (room.active === false) {
      roomID = room.id
      room.active = true
      console.log("player created room " + roomID);
      room.players.push(params.playerName)
      return false
    }
    return true
  })
  fileSystem.writeFileSync('./data.json', JSON.stringify(rooms, null, 2))
  return roomID
}

exports.resetRoom = () => {
  const rooms = JSON.parse(fileSystem.readFileSync('./data.json').toString())
  rooms.map((room, index) => {
    if (room.id === roomID) {
      room.active = false,
        room.players = [],
        room.spectators = []
    }
  })
  fileSystem.writeFileSync('./data.json', JSON.stringify(rooms, null, 2))
}