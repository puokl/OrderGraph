const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
        isAdmin: Boolean
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    }
},{timestamps:true});

module.exports= mongoose.model("User", UserSchema);