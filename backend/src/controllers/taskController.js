const e = require("express");
const asyncHandler = require("express-async-handler");
const Task = require("../models/task");

// @desc    new task
// @route   POST /api/task
// @access  Private
const newTask = asyncHandler(async (req, res) => {
  const { task, start_date, duration, progress } = req.body;
  console.log(req.user._id);
  var date = new Date(start_date);
  const organization = await Task.create({
    task,
    start_date,
    duration,
    progress,
    user_id: req.user._id,
  });

  res.status(200).json({
    Task,
    start_date,
    duration,
    progress,
  });
});

// @desc    Get task
// @route   GET /api/getTask
// @access
const getTask = asyncHandler(async (req, res) => {
  var TaskData = await Task.find();
  res.status(200).json(TaskData);
});

module.exports = { newTask, getTask };
