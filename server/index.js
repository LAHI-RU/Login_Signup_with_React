import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import { UserRouter } from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cookieParser()); // ADD THIS LINE - was missing!
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/auth", UserRouter);

// Add error handling for MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/authentication")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});