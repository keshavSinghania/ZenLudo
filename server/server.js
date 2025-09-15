import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authRouter } from "./routes/auth.routes.js";
import cors from "cors"
import { friendRouter } from "./routes/friend.routes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URI,
  credentials: true,
}));
app.use(express.json());


//all the routes

 //auth routes
 app.use('/api/v1/auth', authRouter);
 app.use('/api/v1/friend', friendRouter)

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

app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});
