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
  const { endDate = today } = req.query;

  const startDate = req.query.startDate;

  if (!startDate) {
    console.log(req.query);
    return res.status(400).json({ message: "Start date is required" });
  }
  const feedback = await sequelize.query(
    `SELECT * FROM Feedback
    WHERE CAST(submitted_at as DATE) BETWEEN :startDate AND :endDate
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
  console.log("req.body :>> ", req.body);
  try {
    const data = await sequelize.query(
      `INSERT INTO feedback (
        name,
        email,
        course_start_date,
        days_served,
        q1,
        q2,
        q3,
        q4,
        q5_1,
        q5_2,
        q5_3,
        q5_4,
        additional_info
      ) VALUES (
        :name,
        :email,
        :course_start_date,
        :days_served,
        :q1,
        :q2,
        :q3,
        :q4,
        :q5_1,
        :q5_2,
        :q5_3,
        :q5_4,
        :additional_info
      )`,
      {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: {
          name: req.body.name || null,
          email: req.body.email || null,
          course_start_date: req.body.courseStart,
          days_served: req.body.daysServed,
          q1: req.body.q1,
          q2: req.body.q2,
          q3: req.body.q3,
          q4: req.body.q4,
          q5_1: req.body.q5.q5_1,
          q5_2: req.body.q5.q5_2,
          q5_3: req.body.q5.q5_3,
          q5_4: req.body.q5.q5_4,
          additional_info: req.body.additional || null,
        },
      }
    );
  } catch (err) {
    console.log("err :>> ", err);
    res.json({ error: "Something went wrong", err });
  }

  // console.log("data :>> ", data);
  // if (!data) {
  //   res.status(400);
  //   throw new Error("Error Submitting Feedback");
  // }
  res.status(200).json({ message: "Feedback submitted successfully" });
});

export { getFeedbackForDate, getFeedbackById, submitFeedback };
