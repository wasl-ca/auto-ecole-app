const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, enum: ['code', 'conduite', 'manoeuvre'], required: true },
    time: { type: String, required: true }, // e.g., "14:00"
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    location: { type: String, required: true }, // e.g., "Online", "In-person"
    duration: { type: Number, required: true }, // duration in minutes
    price: { type: Number, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    notified: { type: Boolean, default: false },
    notes :{ type: String, default: "" },
});

module.exports = mongoose.model('Lesson', LessonSchema);
