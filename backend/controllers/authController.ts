import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

const getAuth = (req, res) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "Not Authorized, no token" });

  res.status(200).json({ message: "Authorized" });
};

const getAdmin = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;
  if (!token)
    return res.status(401).json({ message: "Not Authorized, no token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //get user from DB, assign it to the req.user property
  req.user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!req.user || !req.user.isAdmin) {
    return res.status(401).json({ message: "Not Authorized as an admin" });
  } else {
  }

  res.status(200).json({ message: "Authorized as an admin" });
});

export { getAuth, getAdmin };
