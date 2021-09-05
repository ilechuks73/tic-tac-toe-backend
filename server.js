const express = require('express');
const http = require('http');
const { Server } = require("socket.io")
const uuidV4 = require('uuid').v4
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

let socket;

const rooms = [
  {
    id: '865ec152',
    active: true,
    players: [],
    spectators: []
  },
  {
    id: 'c274a468',
    active: true,
    players: [],
    spectators: []
  },
  {
    id: 'b4ab969f',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '65e717fc',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '458c53de',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '3f0f6400',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '11e1ba31',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '74d2d67f',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: 'bd11399b',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: '7252f631',
    active: false,
    players: [],
    spectators: []
  },
]

app.use(cors())
app.use(express.json())
app.get('/testConnection', (req, res) => {
  res.send({ msg: "server active" });
});

app.get('/requestRoomID', (req, res) => {
  rooms.every((room) => {
    if (room.active === false) {
      res.status(200).json({ roomID: room.id })
      return false
    }
    return true
  })
});

io.on("connection", (socket) => {
  socket.emit("connectionSuccess", socket.id)

  socket.on("createRoom", (data) => {
    rooms.forEach(room => {
      if (room.id === data.roomID) {
        room.active = true
        room.players.push(data.playerName)
      }
    })
    socket.join(data.roomID);
    console.log("player created room " + data.roomID);
  })

  socket.on("joinRoom", (data) => {
    console.log(data.roomID)
    let _room;
    rooms.forEach(room => {
      if (room.id === data.roomID && room.active === true) {
        if (room.players.length >= 2) {
          socket.emit("roomFull")
        }
        room.players.push(data.playerName)
        _room = room
        io.to(socket.id).emit("joinedRoom", room.players[0]);
      }
    })
    socket.join(data.roomID);
    console.log("player joined room " + data.roomID);
    socket.to(data.roomID).emit("joinRoom", data.playerName)
  });

  socket.on("startGame", (roomID) => {
    socket.to(roomID).emit("startGame")
  })

  socket.on("play", (data) => {
    socket.to(data.roomID).emit("play", data)
    console.log(data)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3650, () => {
  console.log('listening on *:3650');
});