const cron = require("node-cron");
const {
  getUpcomingLessonsAndExams,
  getStudentContactInfo,
} = require("../services/scheduleService");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");

// Runs every hour
cron.schedule("0 * * * *", async () => {
  try {
    // Get all lessons and exams happening in 24 hours
    const { lessons, exams } = await getUpcomingLessonsAndExams(24);
    if (lessons.length === 0 || exams.length === 0) {
      if (lessons.length === 0) {
        console.log("No upcoming lessons or exams in the next 24 hours.");
      }
      if (exams.length === 0) {
        console.log("No upcoming exams in the next 24 hours.");
      }
    }
    if (lessons.length === 0 && exams.length === 0) {
      console.log("No upcoming lessons or exams in the next 24 hours.");
      return;
    }

    for (const lesson of lessons) {
      const student = lesson.student;
      if (!student) continue;

      if (student.email) {
        // Send email notification
        await sendEmail({
          to: student.email,
          subject: `Upcoming Lesson: ${lesson.title}`,
          text: `Dear ${student.name},\n\nYou have an upcoming lesson scheduled on ${lesson.date}.\n\nBest regards,\nYour Team`,
        });
        console.log(
          `Sending email to ${student.email} for lesson: ${lesson.title}`
        );
      }
      if (student.phone) {
        // Send SMS notification
        await sendSMS({
          to: student.phone,
          message: `Reminder: You have a lesson on ${lesson.date}.`,
        });
        console.log(
          `Sending SMS to ${student.phone} for lesson: ${lesson.title}`
        );
      }
    }
    for (const exam of exams) {
      const students = exam.registeredStudents;
      for (const studentId of students) {
        const student = await getStudentContactInfo(studentId);
        if (!student) continue;

        // Send email notification
        if (student.email) {
          await sendEmail({
            to: student.email,
            subject: `Upcoming Exam: ${exam.type}`,
            text: `Dear ${student.name},\n\nYou have an upcoming exam scheduled on ${exam.date}.\n\nBest regards,\nYour Team`,
          });
          console.log(
            `Sending email to ${student.email} for exam: ${exam.type}`
          );
        }
        if (student.phone) {
          await sendSMS({
            to: student.phone,
            message: `Reminder: You have an exam on ${exam.date}.`,
          });
          console.log(`Sending SMS to ${student.phone} for exam: ${exam.type}`);
        }
      }
    }
  } catch (error) {
    console.error("Notification job failed:", error);
  }
});

module.exports = {};
