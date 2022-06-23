const mongoose = require("mongoose");

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
    tasks: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
