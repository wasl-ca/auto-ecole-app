const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  type: String,
  date: Date,
  location: String,
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
});

module.exports = mongoose.model("Exam", examSchema);
