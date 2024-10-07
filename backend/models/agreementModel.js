const mongoose = require("mongoose");

const AgreementSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  reciver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  senderSkil: {
    type: String,
    required: true,
  },

  reciverSkil: {
    type: String,
    required: true,
  },

  stage: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Agreement", AgreementSchema);
