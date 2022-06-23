const express = require("express");
const {
  getTest,
  createTest,
  deleteTest,
  updateTest,
  deleteAllTest,
} = require("../controllers/testController");

const User = require("../models/Test");

const router = express.Router({ mergeParams: true });

router.route("/").get(getTest).post(createTest);
router.route("/:testId").delete(deleteTest).put(updateTest);
router.delete("/del/delete", deleteAllTest);

module.exports = router;
