const messegeService = require("../services/messegeService");
const asyncHandler = require("express-async-handler");
const userModal = require("../models/messageModal");
const jwt = require("jsonwebtoken");

const sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const sender = req.user.id;
    const newMessege = await messegeService.sendMessage(
      sender,
      receiver,
      message
    );

    io.emit("receiveMessage", {
      sender,
      receiver,
      message: newMessege,
    });

    console.log("new message", newMessege);

    res.status(201).json({
      message: "new message added",
      messege: newMessege,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAllMessage = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.user.id;
  const response2 = await messegeService.getMessege(senderId, receiverId);

  if (response2) {
    res.status(201).json(response2);
  } else {
    res.status(200).json("no message found");
  }
};

module.exports = {
  sendMessage,
  getAllMessage,
};
