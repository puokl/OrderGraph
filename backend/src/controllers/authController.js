const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const sendTokenResponse = require("../utils/sendToken");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, password, role, organization } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please add all fields", 400));
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorResponse("Email already in use", 400));
  }

  // Create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    role,
    organization,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("please provide an email and password", 400));
  }

  // check for user email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  // check if password matches
  const isMatch = await user.matchPassword(password); // true or false

  if (!isMatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
const getUser = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({ success: true, data: user }); // password won't be shown because we selected false in the model
});

// @desc    Get all users data
// @route   GET /api/v1/auth/
// @access  Public
const getUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

// @desc    Update user data
// @route   PUT /api/v1/auth/update/:userId
// @access  Private
const updateUser = asyncHandler(async (req, res, next) => {
  console.log(req.headers);
  // only allowed to change firstname, lastname and email
  const fieldsToUpdate = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    organization: req.body.organization,
    phone: req.body.phone,
  };

  const user = await User.findByIdAndUpdate(req.params.userId, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user }); // password won't be shown because we selected false in the model
  // const { email, firstname, lastname } = req.body;

  // const user = await User.findByIdAndUpdate(req.params.id, {
  //   $set: req.body,
  // });

  // res.status(200).json("Account has been updated");
});

module.exports = {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
};
