const express = require("express");
const router = express.Router();
const {
  registerOrganization,
  updateOrganization,
  getAllOrganization,
  getSingleOrganization,
  deleteOrganization,
} = require("../controllers/organizationController");

const { protect, authorize } = require("../middleware/auth");

router.post(
  "/neworganization/:userId",
  protect,
  authorize("admin"),
  registerOrganization
);
router.get("/", protect, getAllOrganization);
router.get("/:orgId", protect, getSingleOrganization);
router.put("/update/:orgId", protect, updateOrganization);
router.delete("/:orgId", protect, deleteOrganization);

module.exports = router;
