import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";
import cors from "cors"
import { friendRouter } from "./routes/friend.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import http from "http";
import { Server } from "socket.io";
import { on } from "events";
import { getFriendsFromDB } from "./controller/friend.controller.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();


//web socket(socket io)..................

//IMPLEMENTING SOCKET IO 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    credentials: true,
  }
});

//will store all the online users init with there socket id and user id
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  socket.on("join", async (userId) => {
    socket.userId = userId;
    onlineUsers.set(userId, socket.id);
    console.log(`new user got connected ${socket.id} => ${userId}`);

    // Fetch this user's friends
    const friends = await getFriendsFromDB(userId);
    // Send this user's online friends to them
    const onlineFriends = friends.filter((friend) => onlineUsers.has(friend));
    io.to(socket.id).emit("updateOnlineFriends", onlineFriends);

    friends.forEach((friendId) => {
      if (onlineUsers.has(friendId)) {
        const friendSocketId = onlineUsers.get(friendId);
        io.to(friendSocketId).emit("friendCameOnline", userId);
      }
    });
  });

  socket.on("sendPrivateMessage", (to, from , text) => {
    const receiverSocketId = onlineUsers.get(to);
    if(receiverSocketId) {
      io.to(receiverSocketId).emit("receiveNewMessage", {text:text , senderId:from})
    }
  })
  socket.on("disconnect", async () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      console.log(`User ${socket.userId} disconnected`);

      // Notify this user's friends
      const friends = await getFriendsFromDB(socket.userId);
      friends.forEach((friendId) => {
        if (onlineUsers.has(friendId)) {
          const friendSocketId = onlineUsers.get(friendId);
          io.to(friendSocketId).emit("friendWentOffline", socket.userId);
        }
      });
    }
  });
});



app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true,
}));
app.use(express.json());


//all the routes

//auth routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/friend', friendRouter);
app.use('/api/v1/message', messageRouter);

// Connect to the database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Error handling middleware (last)
app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
