const Exam = require("../models/Exam");
const Student = require("../models/Student");

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ examStatus : "available"}).populate("registeredStudents");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

exports.createExam = async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const saved = await newExam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to create exam" });
  }
};

exports.registerStudentToExam = async (req, res) => {
  const { examId } = req.params;
  const { studentId } = req.body;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    if (exam.registeredStudents.includes(studentId)) {
      return res.status(400).json({ error: "Student already registered" });
    }

    exam.registeredStudents.push(studentId);
    await exam.save();

    await Student.findByIdAndUpdate(studentId, { examRegistered: true });

    res.json({ message: "Student registered to exam" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register student" });
  }
};
