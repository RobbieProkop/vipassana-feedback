import express from "express";
import { getAuth, getAdmin } from "../controllers/authController.js";
const router = express.Router();

//all routes are prefixed with /api/feedback
router.route("/").get(getAuth);
router.route("/admin").get(getAdmin);

export default router;
