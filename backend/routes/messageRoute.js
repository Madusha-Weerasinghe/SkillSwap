const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getAllMessage,
} = require("../controllers/messegeController");

router.post("/send", sendMessage);
router.get("/getMessage/:receiverId", getAllMessage);

module.exports = router;
