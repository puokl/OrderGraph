const fs = require("fs"); // file system module, included with node, because we're using files(data)
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load env vars
dotenv.config();

// load models
const User = require("./src/models/User");

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 100,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/users.json`, "utf-8")
);

const organizations = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/organizations.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await User.create(users);
    // await Organization.create(organizations);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    // await Organization.create(organizations);

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
