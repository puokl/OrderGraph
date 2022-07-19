const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

// @desc      Get all users
// @route     GET /api/v1/user
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json({
    success: true,
    data: allUsers,
  });
});

// @desc      Get single user
// @route     GET /api/v1/user/:id
// @access    Private/Admin
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get all users in org
// @route     GET /api/v1/user/get/UsersInOrg
// @access    Private/Admin
const getUsersInOrg = asyncHandler(async (req, res, next) => {
  const orgUsers = await User.find();

  const orgAdmin = req.user.organization;
  // we are using email to filter
  const currentUser = req.user.email;

  const filteredUsers = orgUsers.filter(
    (x) => x.organization === orgAdmin && x.email !== currentUser
  );

  res.status(200).json({
    length: filteredUsers.length,
    success: true,
    data: filteredUsers,
  });
});

// @desc      Create user
// @route     POST /api/v1/user
// @access    Private/Admin
const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/v1/user/:id
// @access    Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/user/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete multiple users
// @route     DELETE /api/v1/user/deleteMany
// @access    Private/Admin
const deleteMany = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;
  await User.deleteMany({ _id: { $in: ids } });

  res.status(200).json({
    success: true,
    data: {},
  });
});
// body req = {
//     "ids": ["62be9fbc0c4e72b07b692720", "62d01fac83c3f94bee559b03"]

// }

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersInOrg,
  deleteMany,
};
