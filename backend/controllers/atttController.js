const atttService = require('../services/atttService');
const Exam = require('../models/Exam'); // Assuming you have an Exam mongoose model

// Fetch exams from atttService, format, and save to DB
async function syncExams(req, res) {
    try {
        // 1. Get exams from atttService
        const exams = await atttService.getExams();

        if (!exams || exams.length === 0) {
            return res.status(404).json({ message: 'No exams found' });
        }


        // 3. Insert into database (bulk insert)
        await Exam.insertMany(exams);

        res.status(201).json({ message: 'Exams synced successfully', count: formattedExams.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    syncExams,
};