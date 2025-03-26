import { connectDB } from "./database/db.js";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import cvRoutes from "./routes/cv.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "https://stupendous-praline-563a02.netlify.app/", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
      connectDB();
      console.log("Server is running on port: ", PORT);
});

app.use("/api/auth", authRoutes);
app.use("/api/Aicv", cvRoutes);
app.use("/api/interview", interviewRoutes);;


app.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(statusCode).json({
            success: false,
            statusCode,
            message,
      });
});
