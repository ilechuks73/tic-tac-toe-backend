const socket = require("socket.io");

io = socket({cors:{origin:"*"}}).listen(3650, ( ) => {
  console.log(`websocket running at localhost: 9999`);
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user joined room" + data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)

    console.log(data)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


