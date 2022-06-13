const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middleware/errorHandler");
const corsOptions = require("./src/utils/cors");

// express
const express = require("express");
const app = express();

// load env vars
dotenv.config();

// database
const connectDB = require("./src/config/db");
const cors = require("cors");

// routers
const authRouter = require("./src/routes/authRoutes");
const organizationRouter = require("./src/routes/organizationRoutes");
const orderRouter = require("./src/routes/orderRoutes");
const userRouter = require("./src/routes/userRoutes");

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// enable cors
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// mount routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/organization", organizationRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/user", userRouter);

// mongoose error handler
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Èrror: ${err.message}`.red);

  //close server and exit process
  server.close(() => process.exit(1));
});
