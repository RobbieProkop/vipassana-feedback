import asyncHandler from "../middleware/asyncHandler.js";
import User, { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// DESC: authenticate user & get token
// Route: POST /api/users/login
// Access: Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //check if user exists
  const user = await User.findOne({ where: { username } });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const hashedPassword = user.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  //set JWT as httponly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000, //10 days
  });
  res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// DESC: register a new user
// Route: POST /api/users
// Access: Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ where: { username } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

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
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
      });
    }
  } catch (error) {}

  res.json({ message: "registered bro" });
});
// DESC: logout user & clear httponly cookie
// Route: POST /api/users/logout
// Access: Private

const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "logged out bro" });
});
// DESC: get user profile
// Route: GET /api/users/profile
// Access: Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ message: "get profile" });
});
// DESC: update user profile (password & username)
// Route: PUT /api/users/profile
// Access: Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.json({ message: "updated profile" });
});
// DESC: Get Users
// Route: GET /api/users
// Access: Private/Admin

const getAllUsers = asyncHandler(async (req, res) => {
  res.json({ message: "users GOT" });
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
