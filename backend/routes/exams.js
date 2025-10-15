const express = require("express");
const {
  getExams,
  createExam,
  registerStudentToExam
} = require("../controllers/examController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // Protect all routes below

router.get("/", getExams);
router.post("/", createExam);
router.post("/:examId/register", registerStudentToExam);

module.exports = router;
