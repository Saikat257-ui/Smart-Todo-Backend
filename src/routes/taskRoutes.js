const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const protect = require('../middleware/auth');
const verifyTaskOwnership = require('../middleware/taskOwnership');
const {
  createTaskValidation,
  updateTaskValidation
} = require('../utils/validators');

/**
 * Task Routes
 * All routes require authentication
 */

// Create task and get all tasks
router.route('/')
  .post(protect, createTaskValidation, createTask)
  .get(protect, getTasks);

// Update and delete specific task (requires ownership)
router.route('/:id')
  .put(protect, verifyTaskOwnership, updateTaskValidation, updateTask)
  .delete(protect, verifyTaskOwnership, deleteTask);

module.exports = router;
