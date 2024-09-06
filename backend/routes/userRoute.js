const express = require("express");
const router = express.Router();

const { getAllUsers, updateUser } = require("../controllers/userController");

router.get("/get-users", getAllUsers);
router.post("/update-user/:id", updateUser);

module.exports = router;
