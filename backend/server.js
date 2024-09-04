const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(cors());

const PORT = process.env.PORT || 8070;
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  // useCreateIndex: true,
  useNewUrlParser: true,
  // useUnifiedTopologyL:true,
  // useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongodb connection success");
});

const userRouter = require("./routes/userRoute.js");

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("server is up and running on port %d", PORT);
});
