const Lesson = require("../models/Lesson");
const Exam = require("../models/Exam");
const Student = require("../models/Student");

/**
 * Get upcoming lessons and exams for a user.
 * @param {Date} [fromDate=new Date()] - The date from which to search for upcoming events.
 * @returns {Promise<{lessons: Array, exams: Array}>}
 */
async function getUpcomingLessonsAndExams(fromDate = new Date()) {
  // Find upcoming lessons
  const lessons = await Lesson.find({
    date: { $gte: fromDate, $lt: fromDate.add(1, "hour").toDate() },
  })
    .populate("student", "name email phone")
    .sort({ date: 1 });

  // Find upcoming exams
  const exams = await Exam.find({
    date: { $gte: fromDate, $lt: fromDate.add(1, "hour").toDate() },
  })
    .populate("registeredStudents", "name email phone")
    .sort({ date: 1 });

  return { lessons, exams };
}
/**
 * Get contact information for a student.
 * @param {String} studentId - The student's ID.
 * @returns {Promise<Object|null>} - The student's contact info or null if not found.
 */
async function getStudentContactInfo(studentId) {
  const student = await Student.findById(studentId).select("name email phone");
  return student;
}

module.exports = {
  getUpcomingLessonsAndExams,
  getStudentContactInfo,
};
