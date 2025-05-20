const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const authController = require('../../controllers/authController');

jest.mock('../../models/User');
jest.mock('jsonwebtoken');

describe('authController', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, user: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return 401 if user not found', () => {
            req.body = { username: 'test', password: 'pass' };
            User.find.mockReturnValue(null);

            authController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
        });

        it('should return token and username if credentials are valid', () => {
            req.body = { username: 'test', password: 'pass' };
            const user = { username: 'test', role: 'admin' };
            User.find.mockReturnValue(user);
            jwt.sign.mockReturnValue('fake-jwt-token');

            authController.login(req, res);

            expect(jwt.sign).toHaveBeenCalledWith(
                { username: 'test', role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            expect(res.json).toHaveBeenCalledWith({ username: 'test', token: 'fake-jwt-token' });
        });
    });

    describe('me', () => {
        it('should return user data without password', async () => {
            req.user = { username: 'test' };
            const user = { username: 'test', role: 'admin' };
            User.findOne.mockResolvedValue(user);

            await authController.me(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ username: 'test' }, '-password');
            expect(res.json).toHaveBeenCalledWith(user);
        });

        it('should return 404 if user not found', async () => {
            req.user = { username: 'test' };
            User.findOne.mockResolvedValue(null);

            await authController.me(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors and return 500', async () => {
            req.user = { username: 'test' };
            User.findOne.mockRejectedValue(new Error('DB error'));

            await authController.me(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB error' });
        });
    });
});