const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  finished: { type: Boolean },
  halted: { type: Boolean },
  startDate: { type: String },
  haltReason: { type: String },
  taskName: { type: String },
  subTasks: { type: Array },
});

const ItemSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
      required: false,
    },
    public: Boolean,
    itemName: String,
    description: String,
    height: String,
    width: String,
    units: String,
    unitPrice: String,
    tasks: [taskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
