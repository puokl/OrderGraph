const asyncHandler = require("express-async-handler")
const Organization = require("../models/Organization")


// @desc    Register new organization
// @route   POST /api/organization
// @access  Private
const registerOrganization = asyncHandler(async (req, res) => {
    const {companyName, companySize} = req.body
    // check if all fields are provided
    if(!companyName || !companySize) {
            res.status(400)
            throw new Error("Please add all fields")
        }

        const organization = await Organization.create({
        companyName,
        companySize,
    })

    // check if user has already a company value in db
    
    res.status(200).json({companyName: organization.companyName,
        companySize: organization.companySize})
})


// @desc    Update organization
// @route   PUT /api/organization
// @access  
const updateOrganization = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})



// @desc    Get organization
// @route   GET /api/organization
// @access  
const getOrganization = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {registerOrganization, updateOrganization, getOrganization}