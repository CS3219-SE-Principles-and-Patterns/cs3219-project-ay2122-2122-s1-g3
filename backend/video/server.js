const express = require("express");
const cors = require('cors')
const { json } = require('body-parser')
const http = require("http");
const app = express();
const server = http.createServer(app);
const { createClient } = require("redis");
require("dotenv").config();

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
})
app.use(cors())
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:6379`
});
redisClient.on("error", console.error);
redisClient
  .connect()
  .then(() => console.log("Connected to redis locally!"))
  .catch(() => {
    console.error("Error connecting to redis");
  });

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("CONNECTED_TO_VIDEO_ROOM", async ({ roomId, username }) => {
    await redisClient.lPush(
      `${roomId}:video:users`,
      JSON.stringify( {name: username, socketID: socket.id })
    );
    await redisClient.hSet(`video:${socket.id}`, { roomId, username });
    const users = await redisClient.lRange(`${roomId}:video:users`, 0, -1);
    console.log(users)
    const roomName = `ROOM:VIDEO:${roomId}`;
    socket.join(roomName);
    io.in(roomName).emit("ROOM:VIDEO:CONNECTION", users);
  });

  socket.on("disconnect", async () => {
    // Not sure about the line below
    socket.broadcast.emit("partnerLeft");
    const { roomId, username } = await redisClient.hGetAll(`video:${socket.id}`);
    const roomName = `ROOM:VIDEO:${roomId}`;
    io.in(roomName).emit("callEnded");
    const users = await redisClient.lRange(`${roomId}:video:users`, 0, -1);
    const newUsers = users.filter((user) => socket.id !== JSON.parse(user).socketID);
    if (newUsers.length) {
      await redisClient.del(`${roomId}:video:users`);
      await redisClient.lPush(`${roomId}:video:users`, newUsers);
    } else {
      await redisClient.del(`${roomId}:video:users`);
    }
    console.log(newUsers)

  });

  socket.on("callEnded", async () => {
    const { roomId, username } = await redisClient.hGetAll(`video:${socket.id}`);
    const roomName = `ROOM:VIDEO:${roomId}`;
    io.in(roomName).emit("callEnded");
  })

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(3001, () => console.log("server is running on port 3001"));
