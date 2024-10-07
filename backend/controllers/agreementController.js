const agreementService = require("../services/agreementService");

const createAgreement = async (req, res) => {
  try {
    const { reciver, senderSkil, reciverSkil, stage } = req.body;
    const sender = req.user.id;

    const newAgreement = await agreementService.createAgreement(
      sender,
      reciver,
      senderSkil,
      reciverSkil,
      stage
    );

    console.log("new Agreement", newAgreement);

    res.status(201).json({
      message: "new Agreemet created",
      messege: newAgreement,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createAgreement,
};
