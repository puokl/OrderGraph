const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken")

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


// LOGIN
router.post("/login", async (req, res) => {
    try {
        // checking if user exists
        const user = await User.findOne({username: req.body.username});

        // if(!user) {
        //     return res.status(404).json("user not found");
        // }
        // // later to check if password match
        // if(req.body.email === user.email) {
        //     return res.status(200).json(user)
        // } else {
        //     return res.status(420).json({status: "failed"})
        // }

        if(user) {
            // generate an access token
            const accessToken = jwt.sign({username: user.username, isAdmin: user.isAdmin}, "mySecretKey");
            res.json({
                username:user.username,
            isAdmin: user.isAdmin,
            accessToken
        })
        } else {
            res.status(400).json("username or email incorrect!")
        }

    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router