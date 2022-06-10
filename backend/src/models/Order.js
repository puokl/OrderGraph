const mongoose = require("mongoose");

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
    items: [],
    tasks: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
