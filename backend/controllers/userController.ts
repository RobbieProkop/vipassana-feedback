import asyncHandler from "../middleware/asyncHandler.js";
import User, { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import throwError from "../utils/throwError.js";
import updateUserPassword from "../utils/updateUserPassword.js";
import userResponse from "../utils/userResponse.js";

// DESC: authenticate user & get token
// Route: POST /api/users/login
// Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return throwError(res, 400, "Please fill in all fields");

  //check if user exists
  const user = await User.findOne({ where: { username } });

  if (!user) return throwError(res, 401, "Invalid credentials");

  const hashedPassword = user.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) return throwError(res, 401, "Invalid credentials");

  generateToken(res, user.id);
  res.status(200).json(userResponse(user));
});

// DESC: register a new user
// Route: POST /api/users
// Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return throwError(res, 400, "Please fill in all fields");

  //check if user exists
  const userExists = await User.findOne({ where: { username } });

  if (userExists) return throwError(res, 400, "User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    //create user
    const user: UserModel = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    if (user) {
      generateToken(res, user.id);
      res.status(201).json(userResponse(user));
    }
  } catch (error) {
    console.log("error :>> ", error);
    throwError(res, 400, error);
  }
});

// DESC: logout user & clear httponly cookie
// Route: POST /api/users/logout
// Access: Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "logged out" });
});

// DESC: get user profile
// Route: GET /api/users/profile
// Access: Private
const getUserProfile = asyncHandler(async (req, res) => {
  // const user = await User.findByPk(req.user.id);
  const user = req.user;
  if (!user) return throwError(res, 404, "User not found");

  res.status(200).json(userResponse(user));
});

// DESC: update user profile (password & username)
// Route: PUT /api/users/profile
// Access: Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) return throwError(res, 404, "User not found");

  const { username, email, prevPassword, newPassword } = req.body;
  if (username.includes(" "))
    return throwError(res, 400, "Username cannot contain spaces");

  user.username = username || user.username;
  user.email = email || user.email;

  if (prevPassword && newPassword) {
    if (prevPassword !== newPassword) {
      return throwError(res, 400, "Passwords do not match");
    }

    const isPasswordUpdated = await updateUserPassword(
      user,
      prevPassword,
      newPassword
    );

    if (!isPasswordUpdated) return throwError(res, 401, "Invalid credentials");
  }

  // //check if username or email exists
  // const userExists = await User.findOne({ where: { username } });
  // if (userExists) return throwError(res, 400, "User already exists");

  await user.save();
  generateToken(res, user.id);
  res.status(200).json(userResponse(user));
});

// DESC: Get Users
// Route: GET /api/users
// Access: Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

// DESC: Get User By ID
// Route: GET /api/users/:id
// Access: Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.json({ message: "user by id GOT" });
});

// DESC: Update user as admin
// Route: PUT /api/users/:id
// Access: Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: "User updated" });
});

// DESC: DELETE user
// Route: DELETE /api/users/:id
// Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  //check if user exists
  const user = await User.findByPk(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.destroy();
  res.json({ message: "User Deleted" });
});

export {
  loginUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
