const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    contactName: String,
    contactRole: String,
    contactDepartment: String,
    contactPhoneNumber: String,
    contactEMail: {
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
    clientType: { type: String },
    clientName: { type: String },
    clientEMail: {
      type: String,
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    clientPhoneNumber: { type: String },
    website: { type: String },

    financials: {
      registrationNumber: String,
      fiscalNumber: String,
      IBAN: String,
      BIC: String,
      bankName: String,
    },
    billingAddress: {
      Address: String,
      Zip: String,
      City: String,
      State: String,
      AdditionalInformation: String,
    },
    shippingAddress: {
      Address: String,
      Zip: String,
      City: String,
      State: String,
      AdditionalInformation: String,
    },
    contact: [contactSchema],
    orders: [],
    organisation: String, // we got this from the front end
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", ClientSchema);
