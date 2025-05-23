const atttService = require('../services/atttService');
const Exam = require('../models/Exam'); // Assuming you have an Exam mongoose model

// Fetch exams from atttService, format, and save to DB
async function syncExams(req, res) {
    try {
        // 1. Get exams from atttService
        const exams = await atttService.loginAndFetchExams();

        if (!exams || exams.length === 0) {
            return res.status(404).json({ message: 'No exams found' });
        }

        // 2. Update other available exams to full
        const locationsAndTypes = exams.map(e => ({
            location: e.location,
            examType: e.examType,
            Date: e.date,
            Time: e.time,
        }));

        for (const { location, examType } of locationsAndTypes) {
            await Exam.updateMany(
                { examStatus: 'available', location, examType }, 
                { $set: { examStatus: 'full' } }
            );
        }
        // 3. Insert into database (bulk insert)
        await Exam.insertMany(exams);

        

        res.status(201).json({ message: 'Exams synced successfully', count: exams.length });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    syncExams,
};