import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import assetRouter from "./routes/asset.routes.js";

dotenv.config();
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/asset", assetRouter);

app.get("/", (req, res) => {
  res.json("Welcome to the coconut app");
});

// middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

try {
  const connectDB = await mongoose.connect(process.env.MONGODB_COCO_URL);
  if (connectDB) {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("mongoDB is connected");
  }
} catch (error) {
  console.log(error);
}
