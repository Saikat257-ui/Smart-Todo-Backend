import express from 'express';
const router = express.Router();
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import protect from '../middleware/auth.js';
import verifyTaskOwnership from '../middleware/taskOwnership.js';
import {
  createTaskValidation,
  updateTaskValidation
} from '../utils/validators.js';

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

export default router;
