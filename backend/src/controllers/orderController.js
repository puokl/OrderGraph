const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// @desc    Create new order
// @route   POST /api/v1/order/neworder/:orgId
// @access  Private
const newOrder = asyncHandler(async (req, res, next) => {
  req.body.company = req.params.orgId;

  const order = await Order.create(req.body);
  res.status(200).json({ success: true, data: order });
});

// @desc    Get an order
// @route   GET /api/v1/order/:orderID
// @access  Private
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderID);
  res.status(200).json({ success: true, data: order });
});

// @desc    Get ALL order
// @route   GET /api/v1/order
// @access  Private
const getAllOrder = asyncHandler(async (req, res, next) => {
  const allOrder = await Order.find();
  res.status(200).json({ success: true, data: allOrder });
});

// @desc    Update an order
// @route   PUT /api/v1/order/:orderID
// @access  Private

//dotnotation
const updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.orderID);

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

  order = await Order.findByIdAndUpdate(req.params.orderID, dotNotated, {
    new: true,
  });

  res.status(200).json({ success: true, data: order });
});

// @desc    Delete single order
// @route   DELETE /api/v1/order/:orderID
// @access  Private
const deleteOrder = asyncHandler(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.orderID);
  res.status(200).json({ success: true, data: {} });
});

module.exports = { newOrder, getOrder, getAllOrder, updateOrder, deleteOrder };
