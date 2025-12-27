const { validationResult } = require('express-validator');
const Task = require('../models/Task');

/**
 * @route   POST /tasks
 * @desc    Create a new task
 * @access  Private
 */
const createTask = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }

  const { title, description, status, priority } = req.body;

  try {
    // Create task with authenticated user as owner
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /tasks
 * @desc    Get all tasks for authenticated user (with pagination)
 * @access  Private
 */
const getTasks = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Ensure valid pagination parameters
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters. Page and limit must be greater than 0.'
      });
    }

    // Find tasks owned by authenticated user
    const tasks = await Task.find({ owner: req.user._id })
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit);

    // Get total count for pagination metadata
    const totalTasks = await Task.countDocuments({ owner: req.user._id });
    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination: {
        currentPage: page,
        totalPages,
        totalTasks,
        limit
      },
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /tasks/:id
 * @desc    Update a task
 * @access  Private (Owner only)
 */
const updateTask = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }

  const { title, description, status, priority } = req.body;

  try {
    // Task is already attached to req by verifyTaskOwnership middleware
    const task = req.task;

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task
 * @access  Private (Owner only)
 */
const deleteTask = async (req, res, next) => {
  try {
    // Task is already attached to req by verifyTaskOwnership middleware
    await req.task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
