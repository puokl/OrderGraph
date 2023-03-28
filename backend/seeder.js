const fs = require("fs"); // file system module, included with node, because we're using files(data)
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load env vars
dotenv.config();

// load models
const User = require("./src/models/User");
const Organization = require("./src/models/Organization");
const Client = require("./src/models/Client");
const Order = require("./src/models/Order");
const Supplier = require("./src/models/Supplier");
const Item = require("./src/models/Item");

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

const clients = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/clients.json`, "utf-8")
);

const orders = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/orders.json`, "utf-8")
);

const suppliers = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/suppliers.json`, "utf-8")
);

const items = JSON.parse(
  fs.readFileSync(`${__dirname}/src/_data/items.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Organization.create(organizations);
    await Client.create(clients);
    await Order.create(orders);
    await Supplier.create(suppliers);
    await Item.create(items);

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
    await Organization.deleteMany();
    await Client.deleteMany();
    await Order.deleteMany();
    await Supplier.deleteMany();
    await Item.deleteMany();

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
