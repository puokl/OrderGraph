const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  testUser,
  getUsers,
  deleteUser,
  updateUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);
router.get("/test", protect, testUser);
router.get("/", getUsers);
router.delete("/delete", deleteUser)
router.put("/update/:userId", updateUser)

module.exports = router;
