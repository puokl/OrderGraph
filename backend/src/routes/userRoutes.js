const express = require("express")
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    testUser,
} = require("../controllers/userController")

const {protect} = require("../middleware/authMiddleware")

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/me", protect, getUser)
router.post("/test", protect, testUser)

module.exports = router