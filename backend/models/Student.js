const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  examRegistered: { type: Boolean, default: false }
});

module.exports = mongoose.model("Student", studentSchema);
