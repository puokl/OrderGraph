const router = require("express").Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
    try {
        // create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email
        })
        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router