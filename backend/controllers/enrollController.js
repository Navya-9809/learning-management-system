const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const Course = require("../models/Course");
const User = require("../models/User");

const enrollCourse = asyncHandler(async (req, res) => {
  if (req.user.role !== "student") throw new ApiError(403, "Students only");

  const courseId = req.params.courseId;
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(401, "User not found");

  const already = user.enrolledCourses.some((id) => String(id) === String(course._id));
  if (already) return res.json({ message: "Already enrolled" });

  user.enrolledCourses.push(course._id);
  await user.save();

  res.status(201).json({ message: "Enrolled successfully", courseId: course._id });
});

module.exports = { enrollCourse };

