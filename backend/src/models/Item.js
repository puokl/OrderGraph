const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  startDate: {},
  taskName: { type: String },
  finished: {
    type: Boolean,
    default: false,
  },
  halted: {
    type: Boolean,
    default: false,
  },
  haltReason: {
    type: String,
  },
  subTasks: {
    type: Array,
  },
  duration: { type: String },
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
    quantity: String,
    unitPrice: String,
    organization: String,
    tasks: [taskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
