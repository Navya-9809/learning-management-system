const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const User = require("../models/User");

const authMiddleware = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : null;
  if (!token) throw new ApiError(401, "Not authorized, missing token");

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET in environment");

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (err) {
    throw new ApiError(401, err?.name === "TokenExpiredError" ? "Token expired" : "Invalid token");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new ApiError(401, "Not authorized, user not found");

  req.user = user;
  next();
});

module.exports = authMiddleware;
