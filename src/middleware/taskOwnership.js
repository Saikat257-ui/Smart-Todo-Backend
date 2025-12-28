import mongoose from 'mongoose';
import Task from '../models/Task.js';

/**
 * Middleware to verify task ownership
 * Ensures that the authenticated user owns the task they're trying to access
 * Must be used after the 'protect' middleware
 */
const verifyTaskOwnership = async (req, res, next) => {
  const taskId = req.params.id;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID format'
    });
  }

  try {
    // Find task by ID
    const task = await Task.findById(taskId);

    // Check if task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if the authenticated user is the owner of the task
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    // Attach task to request for reuse in controller
    req.task = task;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying task ownership'
    });
  }
};

export default verifyTaskOwnership;
