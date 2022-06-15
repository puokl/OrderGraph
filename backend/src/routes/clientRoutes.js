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

router
  .route("/:clientId")
  .get(getClient)
  .put(updateClient)
  .delete(deleteClient);
router.post("/newclient", newClient);
router.get("/", getAllClient);

module.exports = router;
