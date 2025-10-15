const puppeteer = require('puppeteer'); // Included as per dependencies, but not used for API/controller tests
const Exam = require('../../models/Exam');
const Student = require('../../models/Student');
const examController = require('../../controllers/examController');

jest.mock('../../models/Exam');
jest.mock('../../models/Student');

describe('Exam Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        jest.clearAllMocks();
    });

    describe('getExams', () => {
        it('should return exams with populated students', async () => {
            const exams = [{ _id: '1', registeredStudents: [] }];
            Exam.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(exams) });

            await examController.getExams(req, res);

            expect(res.json).toHaveBeenCalledWith(exams);
        });

        it('should handle errors', async () => {
            Exam.find.mockReturnValue({ populate: jest.fn().mockRejectedValue(new Error()) });

            await examController.getExams(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch exams" });
        });
    });

    describe('createExam', () => {
        it('should create and return new exam', async () => {
            req.body = { name: 'Test Exam' };
            const savedExam = { _id: '1', name: 'Test Exam' };
            const saveMock = jest.fn().mockResolvedValue(savedExam);
            Exam.mockImplementation(() => ({ save: saveMock }));

            await examController.createExam(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(savedExam);
        });

        it('should handle creation errors', async () => {
            req.body = { name: 'Test Exam' };
            Exam.mockImplementation(() => ({ save: jest.fn().mockRejectedValue(new Error()) }));

            await examController.createExam(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Failed to create exam" });
        });
    });

    describe('registerStudentToExam', () => {
        beforeEach(() => {
            req.params = { examId: 'exam1' };
            req.body = { studentId: 'student1' };
        });

        it('should register student to exam', async () => {
            const exam = { 
                registeredStudents: [], 
                save: jest.fn().mockResolvedValue(), 
                registeredStudents: []
            };
            Exam.findById.mockResolvedValue(exam);
            Student.findByIdAndUpdate.mockResolvedValue({});

            await examController.registerStudentToExam(req, res);

            expect(exam.registeredStudents).toContain('student1');
            expect(exam.save).toHaveBeenCalled();
            expect(Student.findByIdAndUpdate).toHaveBeenCalledWith('student1', { examRegistered: true });
            expect(res.json).toHaveBeenCalledWith({ message: "Student registered to exam" });
        });

        it('should return 404 if exam not found', async () => {
            Exam.findById.mockResolvedValue(null);

            await examController.registerStudentToExam(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Exam not found" });
        });

        it('should return 400 if student already registered', async () => {
            const exam = { 
                registeredStudents: ['student1'], 
                save: jest.fn() 
            };
            Exam.findById.mockResolvedValue(exam);

            await examController.registerStudentToExam(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: "Student already registered" });
        });

        it('should handle errors', async () => {
            Exam.findById.mockRejectedValue(new Error());

            await examController.registerStudentToExam(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: "Failed to register student" });
        });
    });
});