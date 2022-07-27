const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  getAllOrder,
  getAllOrdersInOrg,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { protect, authorize } = require("../middleware/auth");

router.get("/", getAllOrder);
router.get("/all/:orgID", getAllOrdersInOrg);
router.post("/neworder/:orgId", protect, authorize("admin"), newOrder);
router
  .route("/:orderID")
  .get(getOrder)
  .put(protect, updateOrder)
  .delete(protect, authorize("admin"), deleteOrder);

module.exports = router;
