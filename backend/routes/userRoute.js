const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  updateUser,
} = require("../controllers/userController");

router.post("/add-user", createUser);
router.get("/get-users", getAllUsers);
router.post("/update-user/:id", updateUser);

module.exports = router;
