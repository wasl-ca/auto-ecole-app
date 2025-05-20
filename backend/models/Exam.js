const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  date: Date,
  location: String,
  examType: {
    type: String,
    enum: ["code", "circulation", "manoeuvre"],
    default: "code",
  },
  examStatus: {
    type: String,
    enum: ["available", "full", "cancelled"],
    default: "available",
  },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

module.exports = mongoose.model("Exam", examSchema);
