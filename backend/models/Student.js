const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  examRegistered: { type: Boolean, default: false },
  fullName: {
          type: String
      },
      email: {
          type: String,
          unique: true,
          sparse: true
      },
      phone: {
          type: String
      },
      address: {
          type: String
      },
      dateOfBirth: {
          type: Date
  },
      cin: {
          type: String,
          unique: true,
          sparse: true
      },
});

module.exports = mongoose.model("Student", studentSchema);
