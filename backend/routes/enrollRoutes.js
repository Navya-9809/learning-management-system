const express = require("express");
const auth = require("../middleware/authMiddleware");
const { enrollCourse } = require("../controllers/enrollController");

const router = express.Router();

router.post("/:courseId", auth, enrollCourse);

module.exports = router;

