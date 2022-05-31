const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
// const authRoute = require("./src/routes/auth");
const port = process.env.PORT || 8000;

// middlewares
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

// // Cors
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
// // end Cors

// app.use("/api/auth", authRoute)
app.use("/api/users", require("./src/routes/userRoutes"));

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
