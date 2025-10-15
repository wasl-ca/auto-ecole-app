const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  cin: {
    type: String,
    unique: true,
    sparse: true,
    required: true,
  },
  examType: {
    type: String,
    enum: ["code", "conduite", "manoeuvre"],
    default: "code",
  },
  status: {
    type: String,
    enum: ["registered", "not_registered", "cancelled", "ready_for_exam", "learning", "exam_failed", "exam_passed"],
    default: "learning",
  },
  prefferredExamDate: {
    type: Date,
  },
  prefferredExamLocation: { type: String },
  registeredExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

module.exports = mongoose.model("Student", studentSchema);
