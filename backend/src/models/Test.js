const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const foodItems = new mongoose.Schema(
  {
    name: { type: String },
  },
  { _id: false, timestamps: true }
);

const TestSchema = new mongoose.Schema(
  {
    // _id: { type: Number },
    name: { type: String },
    food: [foodItems],
  },
  { _id: false, timestamps: true }
);

const UserSchema = new mongoose.Schema({
  name: String,
  country: String,
  city: String,
  inhabitant_number: Number,
});

// add plugins
UserSchema.plugin(AutoIncrement, { inc_field: "id" });

TestSchema.plugin(AutoIncrement, { id: "test_id" });
foodItems.plugin(AutoIncrement, {
  id: "food_id",
  inc_field: "_id",
});

module.exports = mongoose.model("Test", TestSchema);

//_id: { type: Number },
//id: { type: Number },
//food_id: { type: Number },

// const ownerSchema = new Schema({
//   name: String,
//   dog: { type: mongoose.Types.ObjectId, ref: "Dog" },
// });

// const dogSchema = new Schema({
//   name: String,
//   owner: { type: mongoose.Types.ObjectId, ref: "Owner" },
// });

// const Owner = model("owner", ownerSchema);
// const Dog = model("dog", dogSchema);
