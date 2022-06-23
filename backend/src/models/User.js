const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      min: 3,
      max: 20,
      trim: true,
      default: "",
    },
    lastname: {
      type: String,
      min: 3,
      max: 20,
      trim: true,
      default: "",
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
    role: {
      type: String,
      required: [true, "Please add a role"],
      enum: ["worker", "admin", "representative"],
      default: "admin",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // when we get a user through the api is not going to show the password
    },
    organization: {
      // value comes from a put request as response from the frontend once user has created the org
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    phone: String,
  },
  { timestamps: true }
);

// encrypt password using bcrypt
// since we are using save in forgotpassword, this middleware runs and generate error. we manage this with an if statement
UserSchema.pre("save", async function (next) {
  console.log(this);
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this);
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    const salt = await bcrypt.genSalt(10);
    this._update.password = await bcrypt.hash(this._update.password, salt);
  }
});

// sign JWT and return (thta's a method, not a middleware)
UserSchema.methods.getSignedJwtToken = function () {
  // since it is a method and not static, we are going to call it on a user and we'll get his userId
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // await because bcrypt returns a promise
  return await bcrypt.compare(enteredPassword, this.password); // enteredPassword that we get from teh body || that's a method called on the actual user in controllers, so we have the hashed password
};

module.exports = mongoose.model("User", UserSchema);
