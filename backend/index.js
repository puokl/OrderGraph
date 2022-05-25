const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db");
const authRoute = require("./src/routes/auth");
const port = process.env.PORT || 6000;



// middlewares
const app = express();
dotenv.config();
app.use(express.json());
connectDB();

app.use("/api/auth", authRoute)

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
})