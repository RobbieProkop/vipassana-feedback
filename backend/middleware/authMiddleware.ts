import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  //read JWT from the cookie
  let token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //get user from DB, assign it to the req.user property
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export default { protect };
