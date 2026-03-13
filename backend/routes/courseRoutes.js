const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);

router.post("/", authMiddleware, adminMiddleware, createCourse);
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

module.exports = router;
