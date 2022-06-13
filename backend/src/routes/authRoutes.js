const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/authController");

const { protect, authorize } = require("../middleware/auth");

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getUser);
router.put("/update/:userId", protect, authorize("admin"), updateUser);

module.exports = router;
