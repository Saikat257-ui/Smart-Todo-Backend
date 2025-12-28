import { body } from 'express-validator';

/**
 * Validation rules for user registration
 */
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

/**
 * Validation rules for user login
 */
const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Please provide a password')
];

/**
 * Validation rules for task creation
 */
const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Please provide a task title')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either pending or completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high')
];

/**
 * Validation rules for task update
 */
const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either pending or completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high')
];

export {
  registerValidation,
  loginValidation,
  createTaskValidation,
  updateTaskValidation
};
