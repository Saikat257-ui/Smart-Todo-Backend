import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidation, loginValidation } from '../utils/validators.js';

const router = express.Router();

/**
 * Authentication Routes
 */

// Register new user
router.post('/register', registerValidation, register);

// Login user
router.post('/login', loginValidation, login);

export default router;
