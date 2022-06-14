const express = require("express");
const router = express.Router();
const {
  newClient,
  getClient,
  getAllClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const { protect, authorize } = require("../middleware/auth");

// router.use(protect);
// router.use(authorize("admin"));

router.post("/newclient", newClient);
router.get("/:clientId", getClient);
router.get("/", getAllClient);
router.put("/:clientId", updateClient);
router.delete("/", deleteClient);

module.exports = router;
