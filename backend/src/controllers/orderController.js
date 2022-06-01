const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")


// @desc    Create new order
// @route   POST /api/order
// @access  Private
const newOrder = asyncHandler(async (req, res) => {
  const {orderName} = req.body
    req.body.createdByUser = req.params.userId
    req.body.createdByOrganization = req.params.organizationId
  const order = await Order.create(req.body)
    res.status(200).json({order
    })
})




// @desc    Get an order
// @route   GET /api/order
// @access  Private
const getOrder = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


// @desc    Get ALL order
// @route   GET /api/order
// @access  Private
const getAllOrder = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


// @desc    Update an order
// @route   PUT /api/order
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})





// @desc    Delete order
// @route   DELETE /api/order
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {newOrder, getOrder, getAllOrder, updateOrder, deleteOrder}