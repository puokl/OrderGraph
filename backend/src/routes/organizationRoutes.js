const express = require("express");
const router = express.Router();
const {
  registerOrganization,
  updateOrganization,
  getOrganization,
} = require("../controllers/organizationController");

const { protect, authorize } = require("../middleware/auth");

router.post("/neworganization", registerOrganization);
router.get("/organization", protect, getOrganization);
router.put("/organization/update", protect, updateOrganization);

module.exports = router;
