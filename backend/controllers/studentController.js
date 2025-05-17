const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create student" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete student" });
  }
};
