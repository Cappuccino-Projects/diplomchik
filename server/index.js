import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";
import { configDotenv } from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { handlerCore } from "./handlerCore.mjs";

configDotenv({});

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {

  const history = []

  const handler = await handlerCore();
  console.log("❤️ user connected");

  let context = "default";

  const userId = uuidv4();
  socket.join(userId);

  console.log("⚡ created room: " + userId);

  socket.on("chat message", async (msg) => {
    console.log("✅ accepted new message");

    io.to(userId).emit("chat message", msg);

    history.push(msg);

    setTimeout(async () => {

      const { readyDataMessage, newContext } = await handler(msg, context, history);

      context = newContext;

      io.to(userId).emit("chat message", readyDataMessage);
    }, 1000);
  });

  socket.on("disconnect", async () => {
    console.log("❌ user disconnected");
  });
});

const port = process.env.PORT;

server.listen(port, async () => {
  console.log(`✨ server running at http://localhost:${port}`);
});
