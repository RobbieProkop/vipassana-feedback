import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//this is an example of a route handler to spin up the server
app.get("/api/heartbeat", async (req, res) => {
  try {
    // const result = await pool.query("SELECT NOW()");
    // res.json(result.rows[0]);
    res.json({ message: "Server heartbeat" });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/authenticate", (req, res) => {
  const token = req.cookies.jwt;
  console.log("token :>> ", token);
  if (!token)
    return res.status(401).json({ message: "Not Authorized, no token" });

  res.status(200).json({ message: "Authorized" });
});

app.use("/api/feedback", feedbackRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
