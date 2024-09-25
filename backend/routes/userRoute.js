const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUser,
  getUser,
  getUserById,
} = require("../controllers/userController");

router.get("/get-users", getAllUsers);
router.post("/update-user/:id", updateUser);
router.get("/get-user", getUser);
router.get("/get-userbyid/:id", getUserById);

module.exports = router;
