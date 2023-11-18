import express from "express";
import {
  getFeedbackForDate,
  getFeedbackById,
  submitFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

//all routes are prefixed with /api/feedback
router.route("/").get(protect, getFeedbackForDate).post(submitFeedback);
router.route("/:id").get(protect, getFeedbackById);

export default router;
