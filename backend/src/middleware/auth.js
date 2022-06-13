const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //   else if (req.cookies.token) {
  //     token = req.cookies.token;
  //   }

  if (!token) {
    return next(new ErrorResponse("not authorized to access this route", 401));
  }

  try {
    // verify token (we extract the payload = {id: 1, iat:xxx, expiration})

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id); // req.user will always be the current logged in user

    next();
  } catch (error) {
    return next(new ErrorResponse("not authorized to access this route", 401));
  }
});

// grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `user role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
