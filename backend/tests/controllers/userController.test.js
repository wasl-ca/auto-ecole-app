const userController = require('../../controllers/userController');
const User = require('../../models/User');

jest.mock('../../models/User');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    return res;
};

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const users = [{ name: 'John' }, { name: 'Jane' }];
            User.find.mockResolvedValue(users);

            const req = {};
            const res = mockRes();

            await userController.getAllUsers(req, res);

            expect(User.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(users);
        });

        it('should handle errors', async () => {
            User.find.mockRejectedValue(new Error('DB Error'));
            const req = {};
            const res = mockRes();

            await userController.getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB Error' });
        });
    });

    describe('getUserById', () => {
        it('should return user by id', async () => {
            const user = { name: 'John' };
            User.findById.mockResolvedValue(user);

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.getUserById(req, res);

            expect(User.findById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('should return 404 if user not found', async () => {
            User.findById.mockResolvedValue(null);

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors', async () => {
            User.findById.mockRejectedValue(new Error('DB Error'));

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.getUserById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB Error' });
        });
    });

    /*describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = { name: 'John' };
            const saveMock = jest.fn().mockResolvedValue(userData);
            User.mockImplementation(() => ({ save: saveMock }));

            const req = { body: userData };
            const res = mockRes();

            await userController.createUser(req, res);

            expect(saveMock).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(userData);
        });

        it('should handle validation errors', async () => {
            const saveMock = jest.fn().mockRejectedValue(new Error('Validation Error'));
            User.mockImplementation(() => ({ save: saveMock }));

            const req = { body: { name: '' } };
            const res = mockRes();

            await userController.createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Validation Error' });
        });
    });*/

    describe('updateUser', () => {
        it('should update user and return updated user', async () => {
            const updatedUser = { name: 'Jane' };
            User.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const req = { params: { id: '1' }, body: { name: 'Jane' } };
            const res = mockRes();

            await userController.updateUser(req, res);

            expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                { name: 'Jane' },
                { new: true, runValidators: true }
            );
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });

        it('should return 404 if user not found', async () => {
            User.findByIdAndUpdate.mockResolvedValue(null);

            const req = { params: { id: '1' }, body: { name: 'Jane' } };
            const res = mockRes();

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle validation errors', async () => {
            User.findByIdAndUpdate.mockRejectedValue(new Error('Validation Error'));

            const req = { params: { id: '1' }, body: { name: '' } };
            const res = mockRes();

            await userController.updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Validation Error' });
        });
    });

    describe('deleteUser', () => {
        it('should delete user and return message', async () => {
            User.findByIdAndDelete.mockResolvedValue({ _id: '1' });

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.deleteUser(req, res);

            expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ message: 'User deleted' });
        });

        it('should return 404 if user not found', async () => {
            User.findByIdAndDelete.mockResolvedValue(null);

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors', async () => {
            User.findByIdAndDelete.mockRejectedValue(new Error('DB Error'));

            const req = { params: { id: '1' } };
            const res = mockRes();

            await userController.deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB Error' });
        });
    });
});