import asyncHandler from "../middleware/asyncHandler.js";

// DESC: authenticate user & get token
// Route: GET /api/users/login
// Access: Public

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  res.json({ message: "loged in bro" });
});

// DESC: register a new user
// Route: POST /api/users
// Access: Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

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

const updateUser = asyncHandler(async (req, res) => {
  res.json({ message: "updated profile" });
});
// DESC: Get Users
// Route: GET /api/users
// Access: Private/Admin

const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "users GOT" });
});
// DESC: DELETE user
// Route: POST /api/users/:id
// Access: Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.json({ message: "User Deleted" });
});
