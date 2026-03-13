const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    throw new ApiError(400, "name, email, password are required");
  }

  const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) throw new ApiError(409, "User already exists with this email");

  const user = await User.create({
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    password: String(password),
    role: "student",
  });

  const token = generateToken(user._id, user.role);
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) throw new ApiError(400, "email and password are required");

  const user = await User.findOne({ email: String(email).toLowerCase().trim() }).select(
    "+password",
  );
  if (!user) throw new ApiError(401, "Invalid credentials");

  const ok = await user.comparePassword(String(password));
  if (!ok) throw new ApiError(401, "Invalid credentials");

  const token = generateToken(user._id, user.role);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("enrolledCourses");
  res.json({ user });
});

module.exports = { registerUser, loginUser, getMe };
