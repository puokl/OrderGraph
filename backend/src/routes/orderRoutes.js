const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", getAllOrder);
router.post("/neworder/:orgId", newOrder);
router.route("/:ordId").get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
