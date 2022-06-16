const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    department: String,
    phone: String,
    email: {
      type: String,
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
  },
  { _id: false }
);

const ClientSchema = new mongoose.Schema(
  {
    type: { type: String },
    name: { type: String },
    email: {
      type: String,
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: { type: String },
    website: { type: String },

    financials: {
      registrationNo: String,
      fiscalNo: String,
      IBAN: String,
      BIC: String,
      bank: String,
    },
    address: {
      streetAddress: String,
      zip: String,
      city: String,
      country: String,
      additionalDetails: String,
    },
    workplaceAddress: {
      streetAddress: String,
      zip: String,
      city: String,
      country: String,
      additionalDetails: String,
    },
    contacts: [contactSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
