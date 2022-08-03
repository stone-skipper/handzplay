const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  perMessageDeflate: false,
});

const PORT = process.env.PORT || 5000;
// const PORT = 5000;
// const INDEX = "/index.html";

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  console.log("new connection ", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
    console.log("callUser", data.from);
  });

  //   socket.on("switchMode", (data) => {
  //     socket.broadcast.emit("switchMode", {
  //       autoFollow: data.autoFollow,
  //       feedPosition: data.feedPosition,
  //     });
  //     console.log("switchMode", data.feedPosition);
  //   });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
    // console.log("answerCall", data.to, data.signal);
  });
});

server.listen(process.env.PORT || PORT, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

app.get("/", (req, res) =>
  res.send("Hello World! Server is running on " + PORT)
);
