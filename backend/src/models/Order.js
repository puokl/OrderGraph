const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const itemSchema = mongoose.Schema({
  id: Number,
  item: {
    itemName: String,
    itemSize: String,
    itemDescription: String,
  },
  measurementUnit: {
    type: String,
  },
  quantity: {
    type: String,
  },
  unityPriceNoVAT: {
    type: String,
  },
});

const taskSchema = mongoose.Schema({
  startDate: {},
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
});

const OrderSchema = new mongoose.Schema(
  {
    orderDetails: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Organization",
      required: [true, "Please provide an organization"],
    },
    client: {},
    status: {
      type: String,
      required: [true, "Please add a status"],
      enum: ["upcoming", "active", "canceled", "halted", "finished"],
      default: "new",
      trim: true,
    },
    draft: {
      type: Boolean,
      default: false,
    },
    startDate: {},

    documents: [],
    items: [itemSchema],
    tasks: [taskSchema],
  },
  { timestamps: true }
);

itemSchema.plugin;

module.exports = mongoose.model("Order", OrderSchema);
