import dotenv from "dotenv";
import asyncHandler from "../middleware/asyncHandler.js";
dotenv.config();

import { Sequelize, QueryTypes } from "sequelize";
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

//Description: Get All Feedback for specific date range
//Route: GET /api/feedback
//access: Private
const getFeedbackForDate = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate && !endDate) {
    const feedback = await sequelize.query(
      `SELECT * FROM feedback
      ORDER BY id DESC;
      `,
      {
        raw: true,
        type: QueryTypes.SELECT
      }
    );
    return res.status(200).json(feedback);
    // return res.status(400).json({ message: "Start & End dates are required" });
  }

  if (startDate && !endDate) {
    const feedback = await sequelize.query(
      `SELECT * FROM feedback
      WHERE CAST(submitted_at as DATE) >= :startDate 
      ORDER BY id DESC;
      `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          startDate,
        },
      }
    );
    res.status(200).json(feedback);
  }

  if (!startDate && endDate) {
    const feedback = await sequelize.query(
      `SELECT * FROM feedback
      WHERE CAST(submitted_at as DATE) <= :endDate 
      ORDER BY id DESC;
      `,
      {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: {
          endDate,
        },
      }
    );
    res.status(200).json(feedback);
  }
  if (startDate > endDate) {
    return res
      .status(400)
      .json({ message: "Start date cannot be after end date" });
  }

  const feedback = await sequelize.query(
    `SELECT * FROM feedback
    WHERE CAST(submitted_at as DATE) BETWEEN :startDate AND :endDate
  ORDER BY id DESC;
  `,
    {
      raw: true,
      type: QueryTypes.SELECT,
      replacements: {
        startDate,
        endDate,
      },
    }
  );
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
  const {
    name,
    email,
    courseStart,
    daysServed,
    q1,
    q2,
    q3,
    q4,
    q5,
    additional,
  } = req.body;

  const { q5_1, q5_2, q5_3, q5_4 } = q5;

  if (
    !courseStart ||
    !daysServed ||
    !q1 ||
    !q2 ||
    !q3 ||
    !q4 ||
    !q5_1 ||
    !q5_2 ||
    !q5_3 ||
    !q5_4
  ) {
    res.status(400).json({ error: "Please fill in all required fields" });
    return;
  }
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
          name: name || null,
          email: email || null,
          course_start_date: courseStart,
          days_served: daysServed,
          q1: q1,
          q2: q2,
          q3: q3,
          q4: q4,
          q5_1: q5_1,
          q5_2: q5_2,
          q5_3: q5_3,
          q5_4: q5_4,
          additional_info: additional || null,
        },
      }
    );

    if (!data) {
      res.status(400).json({ error: "Error Submitting Feedback" });
      throw new Error("Error Submitting Feedback");
    }
  } catch (err) {
    console.log("err :>> ", err);
    res.json({ error: "Something went wrong", err });
  }
  res.status(200).json({ message: "Feedback submitted successfully" });
});

export { getFeedbackForDate, getFeedbackById, submitFeedback };
