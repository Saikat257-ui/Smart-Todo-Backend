import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../utils/validators.js';

/**
 * Authentication Routes
 */

// Register new user
router.post('/register', registerValidation, register);

// Login user
router.post('/login', loginValidation, login);

export default router;
