const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Please add a company name"],
        min: 3,
        max: 20,
        trim: true,
    },
    companySize: {
        type: String,
        required: [true, "Please add a company size"],
        enum: ['1-5', '6-10', '11-20', '21-50', '50+'],
        default: '1-5',
    },
//     contactDetails: [  

// ],
  

},{timestamps:true});

module.exports= mongoose.model("Organization", OrganizationSchema);