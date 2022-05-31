const express = require("express")
const router = express.Router()
const {
    registerOrganization,
updateOrganization,
getOrganization

} = require("../controllers/organizationController")

const {protect} = require("../middleware/authMiddleware")

router.post("/", protect,registerOrganization)
router.get("/organization", protect, getOrganization)
router.put("/organization/update", protect, updateOrganization)

module.exports = router