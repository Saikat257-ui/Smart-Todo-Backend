const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../utils/validators');

/**
 * Authentication Routes
 */

// Register new user
router.post('/register', registerValidation, register);

// Login user
router.post('/login', loginValidation, login);

module.exports = router;
