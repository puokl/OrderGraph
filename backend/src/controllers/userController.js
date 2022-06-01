const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "1d",
  });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { firstname, lastname, email, password, role } = req.body;
//   if (!firstname || !lastname || !email || !password) {
//     res.status(400);
//     throw new Error("Please add all fields");
//   }

//   // check if user exists
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("Email already in use");
//   }

//   // hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   // Create user
//   const user = await User.create({
//     firstname,
//     lastname,
//     email,
//     role,
//     password: hashedPassword,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       firstname: user.firstname,
//       lastname: user.lasttname,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// delete after test
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, role, organization } = req.body;
  if (!firstname || !lastname || !email || !password) {
    // const { name, email, password} = req.body;
    // if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    role,
    organization,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      organization: user.organization,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// test until here

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get all users data
// @route   GET /api/users/
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
});

// @desc    Get user data
// @route   GET /api/users/test
// @access  Private
const testUser = asyncHandler(async (req, res) => {
  const bob = {
    id: 1,
    name: "bob",
    email: "bob@mail.com",
  };
  res.status(200).json(bob);
});

// @desc    Update user data
// @route   PUT /api/users/test
// @access  Private
const updateUser = async (req, res) => {
  const { email, firstname, lastname } = req.body;
  // if (!email || !name || !lastName) {
  //   res.status(400)
  //   throw new Error("Please add all fields")
  // }

  // const user = await User.findOne({ _id: req.params.userId })

  // user.email = email
  // user.firstname = firstname
  // user.lastname = lastname

  // await user.save()
  const user = await User.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });

  res.status(200).json("Account has been updated");
};

// @desc    Delete user data
// @route   DELETE /api/users/test
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const userToDelete = req.body._id;
  try {
    const deleteUsers = await User.deleteMany({
      _id: {
        $in: [...userToDelete],
      },
    }).then(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// router.delete("/:id", async (req, res) => {
//   if (req.bosy.userId === req.params.id || req.body.isAdmin) {
//     try {
//       const user = await User.findByIdAndDelete(req.params.id);
//       res.status(200).json("Account has been deleted");
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   } else {
//     return res.status(403).json("You can delete only your account!");
//   }
// });
module.exports = {
  registerUser,
  loginUser,
  getUser,
  testUser,
  getUsers,
  deleteUser,
  updateUser,
};
