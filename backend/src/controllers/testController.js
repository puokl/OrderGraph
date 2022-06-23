const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Test = require("../models/Test");

// @desc      Get all tests
// @route     GET /api/v1/test
// @access    Ppublic
const getTest = asyncHandler(async (req, res, next) => {
  const test = await Test.find();

  res.status(200).json({
    success: true,
    data: test,
  });
});

// @desc      Create test
// @route     POST /api/v1/test
// @access    public
const createTest = asyncHandler(async (req, res, next) => {
  const test = await Test.create(req.body);

  res.status(201).json({
    success: true,
    data: test,
  });
});

// @desc      Delete test
// @route     DELETE /api/v1/test/:testId
// @access    Public
const deleteTest = asyncHandler(async (req, res, next) => {
  await Test.findByIdAndDelete(req.params.testId);

  await Test.counterReset("_id", function (err) {
    console.log(err);
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Delete All test
// @route     DELETE /api/v1/test/delete
// @access    Public
const deleteAllTest = asyncHandler(async (req, res, next) => {
  await Test.deleteMany();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Update test
// @route     PUT /api/v1/test/:testId
// @access    public
const updateTest = asyncHandler(async (req, res, next) => {
  let test = await Test.findById(req.params.testId);

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

  test = await Test.findByIdAndUpdate(req.params.testId, dotNotated, {
    new: true,
  });
  res.status(200).json({
    success: true,
    data: test,
  });
});

module.exports = {
  getTest,
  createTest,
  deleteTest,
  updateTest,
  deleteAllTest,
};
