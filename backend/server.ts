import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { testDbConnection } from "./config/db.js";

const PORT = process.env.PORT || 8080;
dotenv.config();

const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // for local testing
    // origin: "https://dso-karuna.dhamma.org",
    credentials: true,
  })
);

//this is an example of a route handler to spin up the server
app.get("/api/heartbeat", async (req, res) => {
  try {
    const response = testDbConnection();
    if (response) {
      console.log('response from heartbeat connection :>> ', await response);
    }
    res.json({ message: "Server heartbeat" });


  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

console.log("bro. ", await testDbConnection())

app.use("/api/authenticate", authRoutes);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
