const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter.js");
const cors = require("cors");
const postRouter = require("./routers/postRouter.js");
const path = require("path");
const notificationRouter = require("./routers/notificationRouter.js");
const multer = require("multer");
const cloudinary = require("cloudinary");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const fileStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "images");
  // },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var maxSize = 3000000;

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
  }).single("image")
);

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
