const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter.js");
const cors = require("cors");
const postRouter = require("./routers/postRouter.js");
const path = require("path");
const notificationRouter = require("./routers/notificationRouter.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL);

app.use("/api/user", userRouter);
app.use("/api/posting", postRouter);
app.use("/api/notification", notificationRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
