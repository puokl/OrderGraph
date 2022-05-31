const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        min: 3,
        max: 20,

    
    },
    lastname: {
        type: String,
        required: [true, "Please add a lastname"],
        min: 3,
        max: 20,
  
    },
   
    email: {
        type: String,
        required: [true, "Please add an email"],
        max: 50,
        unique: true
    },
     role: {
        type: String,
        required: [true, "Please add a role"],
        min: 3,
        max: 20,
        enum: ['worker', 'admin'],
      default: 'worker',
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    organization: {
      type: String,
    },
  
},{timestamps:true});

module.exports= mongoose.model("User", UserSchema);