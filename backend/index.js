const express = require("express");
const colors = require("colors")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
// const authRoute = require("./src/routes/auth");
const port = process.env.PORT || 6000;



// middlewares
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))


// app.use("/api/auth", authRoute)
app.use("/api/users", require("./src/routes/userRoutes"))

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
})