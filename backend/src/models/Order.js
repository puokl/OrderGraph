const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const itemSchema = mongoose.Schema({
  description: { type: String },
  height: { type: String },
  itemName: { type: String },
  public: { type: Boolean },
  quantity: { type: String },
  tasks: { type: Array },
  unitPrice: { type: String },
  units: { type: String },
  width: { type: String },
  id: { type: String },
});

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
  subTasks: [],
  duration: { type: String },
});

const OrderSchema = new mongoose.Schema(
  {
    id: Number,
    orderDetails: {
      type: String,
    },
    createdByOrganization: {
      type: mongoose.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please provide an organization"],
    },
    createdByUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    client: { type: String },
    status: {
      type: String,
      required: [true, "Please add a status"],
      enum: ["upcoming", "active", "canceled", "halted", "finished"],
      default: "upcoming",
      trim: true,
    },
    draft: {
      type: Boolean,
      default: false,
    },
    startDate: { type: String },

    documents: [],
    items: [itemSchema],
    tasks: [taskSchema],
    invoices: [],
  },
  { timestamps: true }
);

itemSchema.plugin;

module.exports = mongoose.model("Order", OrderSchema);
