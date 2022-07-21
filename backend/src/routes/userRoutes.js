const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersInOrg,
  deleteMany,
} = require("../controllers/userController");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });
router.route("/deleteMany").delete(deleteMany);
router.route("/").get(getUsers).post(createUser);
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("admin"));

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);
router.route("/get/UsersInOrg").get(getUsersInOrg);

module.exports = router;
