const express = require("express");
const router = express.Router();

const { login, createUser } = require("../controllers/userController");

router.get("/login", login);
router.post("/signUp", createUser);

module.exports = router;
