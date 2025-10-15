const express = require('express');

// Controller placeholders
const {
    getAllLessons,
    createLesson,
    getLessonById,
    updateLesson,
    deleteLesson,
    isInstructorBooked,
    getLessonsByInstructorId,
    getLessonsByStudentId
} = require('../controllers/lessonController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // Protect all routes below

router.get("/", getAllLessons);
router.post("/", createLesson);
router.get("/:id", getLessonById);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);
router.post("/isBooked", isInstructorBooked);
router.get("/instructor/:instructorId", getLessonsByInstructorId);
router.get("/student/:studentId", getLessonsByStudentId);

module.exports = router;