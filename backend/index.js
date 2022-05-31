const colors = require("colors")
const dotenv = require("dotenv");
const port = process.env.PORT || 6000;

// express
const express = require("express");
const app = express();

// database
const connectDB = require("./src/config/db");

// routers
const userRouter = require("./src/routes/userRoutes")
const organizationRouter = require("./src/routes/organizationRoutes")


dotenv.config();


app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use("/api/users", userRouter)
app.use("/api/users", organizationRouter)


connectDB();

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
})