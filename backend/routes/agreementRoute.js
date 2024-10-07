const express = require("express");
const router = express.Router();

const { createAgreement } = require("../controllers/agreementController");

router.post("/create-agreement", createAgreement);

module.exports = router;
