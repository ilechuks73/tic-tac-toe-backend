const express = require('express');
const http = require('http');
const { Server } = require("socket.io")
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
const server = http.createServer(app);
dotenv.config()

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const rooms = [
  {
    id: '865ec152',
    active: false,
    players: [],
    spectators: []
  },
  {
    id: 'c274a468',
    active: false,
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

function resetRoom(roomID) {
  rooms.map((room, index) => {
    if (room.id === roomID) {
      room.active = false,
        room.players = [],
        room.spectators = []
    }
  })
}

app.use(cors())
app.use(express.json())
app.get('/testConnection', (req, res) => {
  console.log("request at /testConnection")
  res.status(200).end()
});

app.get('/createRoom', (req, res) => {
  console.log("request at /createRoom")
  let roomID = 'XXXXXX'
  rooms.every((room) => {
    if (room.active === false) {
      roomID = room.id
      return false
    }
    return true
  })
  if (roomID === 'XXXXXX') {
    res.status(200).json({ error: true, message: 'no available rooms' })
  }
  else {
    res.status(200).json({ error: false, roomID: roomID })
  }

});

app.get("/joinRoom", (req,res)=>{
  
})

io.on("connection", (socket) => {
  socket.emit("connectionSuccess", socket.id)
  console.log(socket.id)
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
        else {
          room.players.push(data.playerName)
          _room = room
          io.to(socket.id).emit("joinedRoom", room.players[0]);
        }
      }
    })
    socket.join(data.roomID);
    console.log("player joined room " + data.roomID);
    socket.to(data.roomID).emit("message", { sender: "server", content: "someone just joined this room" })
    socket.to(data.roomID).emit("joinRoom", data.playerName)
  });

  socket.on("startGame", (roomID) => {
    socket.to(roomID).emit("startGame")
  })

  socket.on("play", (data) => {
    socket.to(data.roomID).emit("play", data)
    console.log(data)
  });

  socket.on("leaveGame", (data) => {
    socket.in(data).emit("leaveGame", data)
    resetRoom(data)
    console.log(data)
    console.log('user has left a room')
  });

  socket.on("message", (data) => {
    socket.to(data.roomID).emit('message', data)
  })

  socket.on("disconnect", (params) => {
    console.log(params)
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *: ${process.env.PORT}`);
});