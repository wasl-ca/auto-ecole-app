const Lesson = require('../models/Lesson');
const { parseTimeToDate } = require('../utils/formatter'); // Assuming you have a utility function to parse time

// Get all lessons
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().populate('instructor', '_id fullName').populate({ path: 'student', populate: { path: 'userId', select: '_id fullName' }});
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new lesson
exports.createLesson = async (req, res) => {
    try {
        const lesson = new Lesson(req.body);
        await lesson.save();
        res.status(201).json(lesson);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json(lesson);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json({ message: 'Lesson deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.isInstructorBooked = async (req, res) => {
    const { instructorId, date, time, duration } = req.body;

    const startDate = parseTimeToDate(date, time);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    console.log("Checking booking for instructor:", instructorId, "from", startDate, "to", endDate);
  try {
    // Check conflict
    const conflict = await Lesson.findOne({
      instructorId,
      date: {
        $lt: endDate,  // Start of existing lesson is before new lesson ends
      },
      $expr: {
        $gt: [
          { $add: ["$date", { $multiply: ["$duration", 60000] }] },
          startDate,
        ]
      }
    });
      console.log("conflict:", conflict, "startDate:", startDate, "endDate:", endDate);
    res.json({ booked: !!conflict });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get lessons by instructor ID
exports.getLessonsByInstructorId = async (req, res) => {
    console.log("Fetching lessons for instructor ID:", req.params);
    const { instructorId } = req.params;
    if (!instructorId) {
        return res.status(400).json({ error: 'Instructor ID is required' });
    }

    try {
        const lessons = await Lesson.find({ instructor: instructorId }).populate({ path: 'student', populate: { path: 'userId', select: '_id fullName' }});
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Get lessons by student ID
exports.getLessonsByStudentId = async (req, res) => {
    const { studentId } = req.query;
    if (!studentId) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    try {
        const lessons = await Lesson.find({ studentId }).populate('instructor', 'fullName');
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
