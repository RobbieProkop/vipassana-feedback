import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 8080;
dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/feedback", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/feedback/:id", (req, res) => {
  const feedback = "Some feedback here";

  res.json({ feedback });
});

app.use("/api/feedback", feedbackRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
