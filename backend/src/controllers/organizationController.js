const asyncHandler = require("express-async-handler");
const Organization = require("../models/Organization");

// @desc    Register new organization
// @route   POST /api/v1/organization/neworganization/:userId
// @access  Private/Adimn
const registerOrganization = asyncHandler(async (req, res) => {
  req.body.user = req.params.userId;
  console.log(req.body.user);
  const { orgName, orgSize } = req.body;
  // check if all fields are provided
  if (!orgName || !orgSize) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const organization = await Organization.create(req.body);

  // check if user has already a company value in db

  res.status(200).json({ success: true, data: organization });
});

// @desc    Update organization
// @route   PUT /api/v1/organization/update/:orgId
// @access  Private
const updateOrganization = asyncHandler(async (req, res) => {
  let organization = await Organization.findById(req.params.orgId);

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

  organization = await Organization.findByIdAndUpdate(
    req.params.orgId,
    dotNotated,
    { new: true }
  );

  res.status(200).json({ success: true, data: organization });
});

// @desc    Get all organizations
// @route   GET /api/v1/organization
// @access  Private
const getAllOrganization = asyncHandler(async (req, res, next) => {
  const allOrg = await Organization.find();
  res.status(200).json({ success: true, count: allOrg.length, data: allOrg });
});

// @desc    Get single organization
// @route   GET /api/v1/organization/:orgId
// @access  Private

const getSingleOrganization = asyncHandler(async (req, res, next) => {
  const organization = await Organization.findById(req.params.orgId);

  res.status(200).json({ success: true, data: organization });
});

// @desc    Delete single organization
// @route   DELETE /api/v1/organization/:orgId
// @access  Private

const deleteOrganization = asyncHandler(async (req, res, next) => {
  await Organization.findByIdAndDelete(req.params.orgId);

  res.status(200).json({ success: true, data: {} });
});

module.exports = {
  registerOrganization,
  updateOrganization,
  getAllOrganization,
  getSingleOrganization,
  deleteOrganization,
};
