const userService = require("../services/userService");
const asyncHandler = require("express-async-handler");
const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, password, email, age, country } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser(
      name,
      hashedPassword,
      email,
      age,
      country
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
};
