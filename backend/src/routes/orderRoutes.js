const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/").get(getOrder);
router.get("/", getAllOrder);
router.post("/newOrder/:userId/:organizationId", newOrder);
router.put("/", updateOrder);
router.delete("/", deleteOrder);

module.exports = router;
