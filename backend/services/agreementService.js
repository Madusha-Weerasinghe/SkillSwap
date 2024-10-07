const agreementModel = require("../models/agreementModel");

const createAgreement = (sender, reciver, senderSkil, reciverSkil, stage) => {
  try {
    if (!sender || !reciver || !senderSkil || !reciverSkil || !stage) {
      console.log("data is not recived for backend");
    }

    const newAgreement = agreementModel.create({
      sender: sender,
      reciver: reciver,
      senderSkil: senderSkil,
      reciverSkil: reciverSkil,
      stage: stage,
    });

    return newAgreement;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  createAgreement,
};
