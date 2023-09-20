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
    WHERE submitted_at BETWEEN :startDate AND :endDate
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

//Description: Add Feedback
//Route: POST /api/feedback
//access: Private
const submitFeedback = asyncHandler(async (req, res) => {
  const data = await sequelize.query(
    `INSERT INTO feedback (
      name = :name, 
      email = :email, 
      course_start_date = :course_start_date, 
      days_served = :days_served, 
      question1 = :question1, 
      question2 = :question2, 
      question3 = :question3,
      question4 = :question4,
      question5_1 = :question5_1, 
      question5_2 = :question5_2,
      question5_3 = :question5_3,
      question5_4 = :question5_4,
      additional_info = :additional_info
  )
  `,
    {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: {
        name: req.body.name,
        email: req.body.email,
        course_start_date: req.body.course_start_date,
        days_served: req.body.days_served,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4,
        question5_1: req.body.question5_1,
        question5_2: req.body.question5_2,
        question5_3: req.body.question5_3,
        question5_4: req.body.question5_4,
        additional_info: req.body.additional_info,
      },
    }
  );
  if (!data) {
    res.status(400);
    throw new Error("Error Submitting Feedback");
  }
  res.status(200).json({ message: "Feedback submitted successfully" });
});

export { getFeedbackForDate, getFeedbackById, submitFeedback };
