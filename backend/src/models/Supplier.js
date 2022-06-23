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

const SupplierSchema = new mongoose.Schema(
  {
    supplierType: { type: String },
    supplierName: { type: String },
    supplierEMail: {
      type: String,
      max: 50,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    supplierPhoneNumber: { type: String },
    website: { type: String },

    financials: {
      registrationNo: String,
      fiscalNo: String,
      IBAN: String,
      BIC: String,
      bank: String,
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
    contacts: [contactSchema],
    orders: [],
    organization: String, // we got this from the front end
  },
  { timestamps: true }
);

module.exports = mongoose.model("Supplier", SupplierSchema);
