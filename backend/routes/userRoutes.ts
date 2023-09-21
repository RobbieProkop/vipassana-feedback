import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const router = express.Router();

//all routes are prefixed with /api/users
router.route("/").get(getAllUsers).post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
