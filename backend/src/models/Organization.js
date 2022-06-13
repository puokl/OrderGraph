const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: [true, "Please add a company name"],
      min: 3,
      max: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    orgSize: {
      type: String,
      enum: ["1-5", "6-10", "11-20", "21-50", "50+"],
      default: "1-5",
    },
    website: {
      type: String,
    },
    address: {
      streetAddress: String,
      zip: String,
      city: String,
      country: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
    },
    additional: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", OrganizationSchema);
