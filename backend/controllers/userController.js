const userService = require("../services/userService");
const asyncHandler = require("express-async-handler");
const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, password, email, age, country, skils, followers, following } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser(
      name,
      hashedPassword,
      email,
      age,
      country,
      skils,
      followers,
      following
    );

    console.log("New Method:", newUser);

    res.status(201).json({
      message: "User create successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const response2 = await userModal.find({});

  if (response2) {
    res.status(201).json(response2);
  } else {
    res.status(200).json("no users found");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const response2 = await userService.getUserById(userId);

  if (response2) {
    res.status(201).json(response2);
  } else {
    res.status(200).json("no users found");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const response2 = await userService.getUserById(userId);

  if (response2) {
    res.status(201).json(response2);
  } else {
    res.status(200).json("no users found");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  console.log(user);
  console.log(token);
  return res.status(200).json({
    user,
    token,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await userModal.findById(id);

  if (checkInstance) {
    const response = await userModal.findByIdAndUpdate(id, { ...req.body });

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(403).json("Method cannot be update");
    }
  } else {
    res.status(404).json("Method does not exists");
  }
});

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  login,
  getUser,
  getUserById,
};
