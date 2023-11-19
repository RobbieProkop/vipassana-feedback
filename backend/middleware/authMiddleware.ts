import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  //read JWT from the cookie

  console.log("req.cookies :>> ", req.cookies);
  let token = req.cookies.jwt;
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
    next();
  } catch (error) {
    console.log("error :>> ", error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
