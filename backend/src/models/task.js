const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    progress: {
      type: Number,
    },
    user_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
