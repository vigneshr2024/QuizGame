const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
const port1 = 3000;
const server = app.listen(port1, console.log("listening on port 3000"));
const io = require("socket.io")(server);
// console.log(path.join(__dirname, "public/js"));
const bodyParser = require("body-parser");

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/public/js",
  express.static("public/js", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "text/javascript");
      }
    },
  })
);

//dashboard
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.get("/player-a", (req, res) => {
  res.sendFile(__dirname + "/player_a.html");
});

app.get("/player-b", (req, res) => {
  res.sendFile(__dirname + "/player_b.html");
});

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("msg", function (msg) {
    io.emit("newmsg", msg); // Emit message to all connected clients
    console.log("Received message:", msg);
  });

  socket.on("gameStart", function (game) {
    io.emit("newGameStart", game); // Emit message to all connected clients
    console.log("Received game start:", game);
  });
});
