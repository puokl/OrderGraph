const asyncHandler = require("../middleware/asyncHandler");
const Client = require("../models/Client");

// @desc      Get all clients
// @route     GET /api/v1/client
// @access    Private/Admin
const getAllClient = asyncHandler(async (req, res, next) => {
  const allClients = await Client.find();

  res.status(200).json({
    success: true,
    data: allClients,
  });
});

// @desc      Get single client
// @route     GET /api/v1/client/:clientId
// @access    Private/Admin
const getClient = asyncHandler(async (req, res, next) => {
  const client = await Client.findById(req.params.clientId);

  res.status(200).json({
    success: true,
    data: client,
  });
});

// @desc      Create client
// @route     POST /api/v1/client
// @access    Private/Admin
const newClient = asyncHandler(async (req, res, next) => {
  const client = await Client.create(req.body);

  res.status(201).json({
    success: true,
    data: client,
  });
});

// @desc      Update client
// @route     PUT /api/v1/client/:clientId
// @access    Private/Admin
const updateClient = asyncHandler(async (req, res, next) => {
  let client = await Client.findById(req.params.clientId);

  // dot notation is needed in order to update an embedded document
  function convertToDotNotation(obj, newObj = {}, prefix = "") {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        convertToDotNotation(obj[key], newObj, prefix + key + ".");
      } else {
        newObj[prefix + key] = obj[key];
      }
    }

    return newObj;
  }

  const dotNotated = convertToDotNotation(req.body);

  client = await Client.findByIdAndUpdate(req.params.clientId, dotNotated, {
    overwrite: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    data: client,
  });
});

// @desc      Delete client
// @route     DELETE /api/v1/client/:clientId
// @access    Private/Admin
const deleteClient = asyncHandler(async (req, res, next) => {
  await Client.findByIdAndDelete(req.params.clientId);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  newClient,
  getClient,
  getAllClient,
  updateClient,
  deleteClient,
};
