const colors = require("colors");
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
const morgan = require("morgan");

// express
const express = require("express");
const app = express();

// database
const connectDB = require("./src/config/db");
const cors = require("cors");

// routers
const userRouter = require("./src/routes/userRoutes");
const organizationRouter = require("./src/routes/organizationRoutes");
const orderRouter = require("./src/routes/orderRoute")

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// morgan
app.use(morgan('dev'));

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

app.use("/api/users", userRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/order", orderRouter)

connectDB();

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
