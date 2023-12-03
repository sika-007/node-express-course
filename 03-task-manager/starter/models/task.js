const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a valid name"],
    trim: true,
    maxlength: [20, "Name cannot be more thn 20 characters"],
    minlength: [2, "Name cannot be less than two characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
