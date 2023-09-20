import dotenv from "dotenv";
import asyncHandler from "../middleware/asyncHandler.js";
dotenv.config();

import { Sequelize, DataTypes, Op, QueryTypes } from "sequelize";
const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  pool: {
    max: 1,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

//Description: Get All Feedback
//Route: GET /api/feedback
//access: Private
// const getAllFeedback = asyncHandler(async (req, res) => {
//   const feedback = await sequelize.query(
//     `SELECT * FROM Feedback
//   ORDER BY id DESC;`,
//     {
//       raw: true,
//       type: QueryTypes.SELECT,
//     }
//   );
//   res.status(200).json(feedback);
// });

//Description: Get All Feedback for specific date range
//Route: GET /api/feedback
//access: Private
const getFeedbackForDate = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const { startDate, endDate = today } = req.query;

  if (!startDate) {
    return res.status(400).json({ message: "Start date is required" });
  }
  const feedback = await sequelize.query(
    `SELECT * FROM Feedback
    WHERE date BETWEEN :startDate AND :endDate
  ORDER BY id DESC;`,
    {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: {
        startDate,
        endDate,
      },
    }
  );

  console.log("feedback :>> ", feedback);
  res.status(200).json(feedback);
});

//Description: Get Single Feedback
//Route: GET /api/feedback/:id
//access: Private
const getFeedbackById = asyncHandler(async (req, res) => {
  const feedback = await sequelize.query(
    `SELECT * FROM Feedback
    WHERE id = :id;`,
    {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: { id: req.params.id },
    }
  );
  if (!feedback) {
    res.status(400);
    throw new Error("Feedback not found");
  }
  res.status(200).json(feedback);
});

export { getFeedbackForDate, getFeedbackById };
