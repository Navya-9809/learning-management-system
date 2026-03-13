const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const Course = require("../models/Course");

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, thumbnail, videoUrl, price } = req.body || {};

  if (!title || !description || !videoUrl || price === undefined) {
    throw new ApiError(400, "title, description, videoUrl, price are required");
  }

  const course = await Course.create({
    title,
    description,
    thumbnail: thumbnail || "",
    videoUrl,
    price: Number(price),
    instructor: req.user._id,
  });

  res.status(201).json(course);
});

const getAllCourses = asyncHandler(async (req, res) => {
  const { q, createdBy } = req.query || {};

  const filter = {};
  if (createdBy && mongoose.isValidObjectId(createdBy)) filter.createdBy = createdBy;
  if (q) {
    filter.$or = [
      { title: { $regex: String(q), $options: "i" } },
      { description: { $regex: String(q), $options: "i" } },
    ];
  }

  const courses = await Course.find(filter)
    .sort({ createdAt: -1 })
    .populate("instructor", "name email role");

  res.json(courses);
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name email role");
  if (!course) throw new ApiError(404, "Course not found");
  res.json(course);
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw new ApiError(404, "Course not found");

  const allowed = ["title", "description", "thumbnail", "videoUrl", "price"];
  for (const key of allowed) {
    if (req.body?.[key] !== undefined) course[key] = req.body[key];
  }

  await course.save();
  res.json(course);
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) throw new ApiError(404, "Course not found");
  await course.deleteOne();
  res.json({ message: "Course deleted" });
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
