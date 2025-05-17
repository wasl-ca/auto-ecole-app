const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRES_IN = '1h';

/**
 * Generates a JWT token for a given payload.
 * @param {Object} payload - Data to encode in the token.
 * @returns {string} JWT token.
 */
function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

module.exports = {
    generateToken,
};