const asyncHandler = require("../middleware/asyncHandler");
const Supplier = require("../models/Supplier");

// @desc      Get all suppliers
// @route     GET /api/v1/supplier
// @access    Private/Admin
const getAllSupplier = asyncHandler(async (req, res, next) => {
  const allSupplier = await Supplier.find();

  res.status(200).json({
    success: true,
    data: allSupplier,
  });
});

// @desc      Get single supplier
// @route     GET /api/v1/supplier/:supplierId
// @access    Private/Admin
const getSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.supplierId);

  res.status(200).json({
    success: true,
    data: supplier,
  });
});

// @desc      Create supplier
// @route     POST /api/v1/supplier
// @access    Private/Admin
const newSupplier = asyncHandler(async (req, res, next) => {
  const supplier = await Supplier.create(req.body);

  res.status(201).json({
    success: true,
    data: supplier,
  });
});

// @desc      Update supplier
// @route     PUT /api/v1/supplier/:supplierId
// @access    Private/Admin
const updateSupplier = asyncHandler(async (req, res, next) => {
  let supplier = await Supplier.findById(req.params.supplierId);

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

  supplier = await Supplier.findByIdAndUpdate(
    req.params.supplierId,
    dotNotated,
    {
      overwrite: true,
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    data: supplier,
  });
});

// @desc      Delete supplier
// @route     DELETE /api/v1/supplier/:supplierId
// @access    Private/Admin
const deleteSupplier = asyncHandler(async (req, res, next) => {
  await Supplier.findByIdAndDelete(req.params.supplierId);

  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = {
  newSupplier,
  getSupplier,
  getAllSupplier,
  updateSupplier,
  deleteSupplier,
};
