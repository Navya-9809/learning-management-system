const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const getMyEnrollments = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("enrolledCourses");
  res.json({ enrolledCourses: user?.enrolledCourses || [] });
});

module.exports = { getMyEnrollments };
