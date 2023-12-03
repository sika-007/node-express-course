const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const { CustomAPIError, createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks, amount: tasks.length, success: true });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await new Task({ ...req.body });
  await task.save();
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return next(createCustomError(`No task ID with ${req.params.id}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return next(createCustomError(`No task ID with ${req.params.id}`, 404));
  }
  res.status(201).json({ task });
};

const editTask = async (req, res) => {
  // For demonstration purposes
  // This is for the put HTTP call
  try {
    const { id } = req.params;
    const task = await Task.findOneAndReplace({ _id: id }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true, // Disabling the default key in the schema and using this key value pair here will enable us to replace a document in Mongo
    });
    if (!task) {
      return next(createCustomError(`No task ID with ${req.params.id}`, 404));
    }
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return next(createCustomError(`No task ID with ${req.params.id}`, 404));
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
  editTask,
};
