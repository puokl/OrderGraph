const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        min: 3,
        max: 20,
        unique: true,
        isAdmin: Boolean
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        max: 50,
        unique: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
},{timestamps:true});

module.exports= mongoose.model("User", UserSchema);