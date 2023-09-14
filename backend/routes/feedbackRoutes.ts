import express from "express";
import {
  getAllFeedback,
  getFeedbackById,
} from "../controllers/feedbackController.js";
const router = express.Router();

//all routes are prefixed with /api/feedback
router.route("/").get(getAllFeedback);
router.route("/:id").get(getFeedbackById);
