import express from "express";
import {
  loginUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, adminMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

//all routes are prefixed with /api/users
router.route("/").get(getAllUsers).post(registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
