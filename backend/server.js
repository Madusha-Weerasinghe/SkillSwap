const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const { protect } = require("./middleware/auth.js");
require("dotenv").config();
const http = require("http");
const initializeSocket = require("./socket");

app.use(cors());

const PORT = process.env.PORT || 8070;
app.use(bodyParser.json());
const server = http.createServer(app);

const io = initializeSocket(server);

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
const loginSignUpRouter = require("./routes/loginSignUpRoute.js");
const messageRouter = require("./routes/messageRoute.js");
const agreementRouter = require("./routes/agreementRoute.js");

app.use("/user", protect, userRouter);
app.use("/", loginSignUpRouter);
app.use("/chat", protect, messageRouter);
app.use("/agreement", protect, agreementRouter);

server.listen(PORT, () => {
  console.log("server is up and running on port %d", PORT);
});
