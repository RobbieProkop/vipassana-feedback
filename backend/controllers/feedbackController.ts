import dotenv from "dotenv";
import asyncHandler from "../middleware/asyncHandler";
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
const getAllFeedback = asyncHandler(async (req, res) => {});

//Description: Get Single Feedback
//Route: GET /api/feedback/:id
//access: Private
const getFeedbackById = asyncHandler(async (req, res) => {});

export { getAllFeedback, getFeedbackById };
