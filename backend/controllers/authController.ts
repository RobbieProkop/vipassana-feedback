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

  console.log("req.cookies.jwt :>> ", req.cookies.jwt);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //get user from DB, assign it to the req.user property
  req.user = await User.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  res.status(200).json(req.user.isAdmin);
});

export { getAuth, getAdmin };
