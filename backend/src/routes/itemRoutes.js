const express = require("express");
const router = express.Router();
const {
  newItem,
  getItem,
  getAllItem,
  updateItem,
  deleteItem,
  getAllItemsInOrg,
} = require("../controllers/itemController");

const { protect, authorize } = require("../middleware/auth");

// router.use(protect);
// router.use(authorize("admin"));

router.route("/:itemId").get(getItem).put(updateItem).delete(deleteItem);
router.post("/newitem", newItem);
router.get("/", getAllItem);
router.get("/all/:orgID", getAllItemsInOrg);

module.exports = router;
