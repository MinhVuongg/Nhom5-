import express from "express";
import http from "http";
import { Server } from "socket.io";

var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = http.Server(app);
var io = new Server(server);

io.on("connection", (socket) => {
  console.log("someone connected");

  socket.on("action", handleAction);
  function handleAction(action) {
    console.log(action);
    socket.emit("stageChange", {
      action: {
        type: "lostHealth",
        healthPoint: 1,
        playerId: 1,
      },
    });
  }

  socket.on("joinGame", handleJoinGame);
  function handleJoinGame(params) {
    console.log("someone join game");
    socket.emit("gameState", {
      cards: [
        { name: "kill", type: 1 },
        { name: "dodge", type: 1 },
        { name: "peach", type: 1 },
        { name: "wine", type: 1 },
      ],
    });
  }
});

app.get("/", function (req, res) {
  res.render("index");
});

server.listen(5000);
