import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import express from "express";  // Import Express
import dotenv from "dotenv";
import chatRoutes from './routes/chatRoutes.js';  // Import your chat routes
import messageRoutes from './routes/messageRoutes.js';  // Import your message routes
import userRoutes from './routes/userRoutes.js';  // Import your user routes
import { pool } from "./database/index.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Setup Next.js app
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  // Create Express server
  const server = express();

  // Middleware to parse JSON requests
  server.use(express.json());

  // Define API routes
  server.use("/api/chats", chatRoutes);  // Use the chat routes
  server.use("/api/messages", messageRoutes);  // Use the message routes
  server.use("/api/users", userRoutes);  // Use the user routes

  // Handle all Next.js requests
  server.all('*', (req, res) => {
    return handler(req, res);
  });

  // Create an HTTP server with Socket.IO
  const httpServer = createServer(server);

  const io = new Server(httpServer);

  // Set up socket.io connection
  io.on("connection", (socket) => {
    console.log("Connected " + socket.id);

    socket.on("disconnect", (reason) => {
      console.log(socket.id + ": " + reason);
    });
  });

  // Test database connection
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to the database');
    release();
  });

  // Start the server
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
