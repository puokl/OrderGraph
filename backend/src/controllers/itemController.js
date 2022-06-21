const asyncHandler = require("../middleware/asyncHandler");
const Item = require("../models/Item");

// @desc      Get all items
// @route     GET /api/v1/item
// @access    Private/Admin
const getAllItem = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find();

  res.status(200).json({
    success: true,
    data: allItems,
  });
});

// @desc      Get single item
// @route     GET /api/v1/item/:itemId
// @access    Private/Admin
const getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);

  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc      Create item
// @route     POST /api/v1/item
// @access    Private/Admin
const newItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);

  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc      Update item
// @route     PUT /api/v1/item/:itemId
// @access    Private/Admin
const updateItem = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.itemId);

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

  item = await Item.findByIdAndUpdate(req.params.itemId, dotNotated, {
    overwrite: true,
    new: true,
  });
  res.status(200).json({
    success: true,
    data: item,
  });
});

// @desc      Delete item
// @route     DELETE /api/v1/item/:itemId
// @access    Private/Admin
const deleteItem = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.itemId);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  newItem,
  getItem,
  getAllItem,
  updateItem,
  deleteItem,
};
