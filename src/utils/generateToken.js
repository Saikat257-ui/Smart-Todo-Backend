import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRE } from '../config/env.js';

/**
 * Generate JWT token for user authentication
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};

export default generateToken;
