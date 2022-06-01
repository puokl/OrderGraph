const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: [true, "Please add a orderName"],
    },
    status: {
        type: String,
        required: [true, "Please add a status"],
        min: 3,
        max: 20,
        enum: ["new", "in_progress", "finished"],
        default: "new",
        trim: true,
    },
    createdByUser: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    createdByOrganization: {
      type: mongoose.Types.ObjectId,
      ref: 'Organization',
      required: [true, 'Please provide user'],
    },
    
},{timestamps:true});

module.exports= mongoose.model("Order", OrderSchema);

