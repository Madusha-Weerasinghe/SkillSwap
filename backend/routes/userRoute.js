const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUser,
  getUser,
  getUserById,
  getUserByToken,
} = require("../controllers/userController");

router.get("/get-users", getAllUsers);
router.post("/update-user/:id", updateUser);
router.get("/get-user", getUser);
router.get("/get-userbyid/:id", getUserById);
router.get("/get-user-by-token", getUserByToken);

module.exports = router;
