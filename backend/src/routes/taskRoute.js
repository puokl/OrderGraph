const express = require("express");
const router = express.Router();
const { newTask, getTask } = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.post("/newTask", protect, newTask);

router.get("/getTask", protect, getTask);

module.exports = router;
