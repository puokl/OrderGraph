const express = require("express");
const router = express.Router();
const {
  newOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/neworder/:orgId", newOrder);
router.route("/").get(getOrder);
router.get("/", getAllOrder);
router.put("/", updateOrder);
router.delete("/", deleteOrder);

module.exports = router;
