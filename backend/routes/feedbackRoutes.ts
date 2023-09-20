import express from "express";
import {
  getFeedbackForDate,
  getFeedbackById,
  submitFeedback,
} from "../controllers/feedbackController.js";
const router = express.Router();

//all routes are prefixed with /api/feedback
router.route("/").get(getFeedbackForDate).post(submitFeedback);
router.route("/:id").get(getFeedbackById);

export default router;
