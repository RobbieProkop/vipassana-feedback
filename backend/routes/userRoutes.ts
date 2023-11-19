import express from "express";
import {
  loginUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

//all routes are prefixed with /api/users
router
  .route("/")
  .get(protect, admin, getAllUsers)
  .post(protect, admin, registerUser); //register is protected by the admin to prevent random people from registering;
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/pass").put(protect, updatePassword);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
