const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getMyEnrollments } = require("../controllers/userController");

const router = express.Router();

router.get("/me/enrollments", authMiddleware, getMyEnrollments);

module.exports = router;

