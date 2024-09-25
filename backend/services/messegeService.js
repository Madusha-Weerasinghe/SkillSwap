const messegeModal = require("../models/messageModal");

const sendMessage = (sender, reciver, message) => {
  try {
    if (!sender || !reciver || !message) {
      throw new Error("Message details required");
    }

    const newMessage = messegeModal.create({
      sender: sender,
      reciver: reciver,
      message: message,
    });

    return newMessage;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

const getMessege = (senderID, reciverID) => {
  try {
    const messege = messegeModal
      .find({
        $or: [
          { sender: senderID, reciver: reciverID },
          { sender: reciverID, reciver: senderID },
        ],
      })
      .sort({ timestamp: 1 });

    return messege;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  sendMessage,
  getMessege,
};
