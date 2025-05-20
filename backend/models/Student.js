const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  examRegistered: { type: Boolean, default: false },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
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
  prefferredExamDate: {
    type: Date,
  },
  prefferredExamLocation: { type: String },
  registeredExam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
});

module.exports = mongoose.model("Student", studentSchema);
