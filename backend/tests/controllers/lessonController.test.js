const lessonController = require('../../controllers/lessonController');
const Lesson = require('../../models/Lesson');
jest.mock('../../models/Lesson');  
describe('lessonController', () => {
     let req, res;

     beforeEach(() => {
       req = { body: {}, user: {}, params: {} };
       res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn(),
       };
       jest.clearAllMocks();
     });
    describe('getAllLessons', () => {
        it('should return all lessons', async () => {
            const mockLessons = [
                { _id: 'lesson1', title: 'Lesson 1' },
                { _id: 'lesson2', title: 'Lesson 2' },
            ];
            Lesson.find.mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockLessons),
                }),
            });
            await lessonController.getAllLessons(req, res);
            expect(Lesson.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockLessons);
        });
        it('should handle errors and return 500', async () => {
            Lesson.find.mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockRejectedValue(new Error('DB error')),
                }),
            });
            await lessonController.getAllLessons(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });
    describe('getLessonById', () => {
        it('should return a lesson by ID', async () => {
            req.params.id = 'lesson123';
            const mockLesson = { _id: 'lesson123', title: 'Sample Lesson' };
            Lesson.findById.mockResolvedValue(mockLesson);      
            await lessonController.getLessonById(req, res);
            expect(Lesson.findById).toHaveBeenCalledWith('lesson123');
            expect(res.json).toHaveBeenCalledWith(mockLesson);
        });
        it('should return 404 if lesson not found', async () => {
            req.params.id = 'lesson123';
            Lesson.findById.mockResolvedValue(null);
            await lessonController.getLessonById(req, res);     
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lesson not found' });
        });
        it('should handle errors and return 500', async () => {
            req.params.id = 'lesson123';
            Lesson.findById.mockRejectedValue(new Error('DB error'));
            await lessonController.getLessonById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });

    describe('createLesson', () => {
        it('should create and return a new lesson', async () => {
            req.body = { date: new Date(), type: 'code', time: '14:00', location: 'Online', duration: 60, price: 100, instructor: 'instructorId', student: 'studentId' };
            const mockLesson = { _id: 'lesson123', ...req.body };
            Lesson.prototype.save.mockResolvedValue(mockLesson);

            await lessonController.createLesson(req, res);

            expect(Lesson).toHaveBeenCalledWith(req.body);
            expect(Lesson.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockLesson);
        });

        it('should handle errors and return 500', async () => {
            req.body = {
              date: new Date(),
              type: "code",
              time: "14:00",
              location: "Online",
              duration: 60,
              price: 100,
              instructor: "instructorId",
              student: "studentId",
            };
            Lesson.prototype.save.mockRejectedValue(new Error('DB error'));

            await lessonController.createLesson(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });
    describe('deleteLesson', () => {
        it('should delete a lesson by ID', async () => {
            req.params.id = 'lesson123';
            const mockLesson = { _id: 'lesson123', title: 'Lesson to Delete' };
            Lesson.findByIdAndDelete.mockResolvedValue(mockLesson);

            await lessonController.deleteLesson(req, res);

            expect(Lesson.findByIdAndDelete).toHaveBeenCalledWith('lesson123');
            expect(res.json).toHaveBeenCalledWith({ message: 'Lesson deleted' });
        });

        it('should return 404 if lesson not found', async () => {
            req.params.id = 'lesson123';
            Lesson.findByIdAndDelete.mockResolvedValue(null);

            await lessonController.deleteLesson(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Lesson not found' });
        });

        it('should handle errors and return 500', async () => {
            req.params.id = 'lesson123';
            Lesson.findByIdAndDelete.mockRejectedValue(new Error('DB error'));

            await lessonController.deleteLesson(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });
    // Additional tests for updateLesson and getLessonById can be added similarly
});
