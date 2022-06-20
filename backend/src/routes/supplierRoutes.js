const express = require("express");
const router = express.Router();
const {
  newSupplier,
  getSupplier,
  getAllSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const { protect, authorize } = require("../middleware/auth");

// router.use(protect);
// router.use(authorize("admin"));

router
  .route("/:supplierId")
  .get(getSupplier)
  .put(updateSupplier)
  .delete(deleteSupplier);
router.post("/newsupplier", newSupplier);
router.get("/", getAllSupplier);

module.exports = router;
