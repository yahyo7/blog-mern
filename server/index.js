import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import path from "path";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const __dirname = path.resolve();

// Create Express app

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Register routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
