const express = require("express");
const {
  getNotif,
  postSetSeen,
} = require("../controller/notificationController.js");
const { isAuth } = require("../utils.js");

const notificationRouter = express.Router();

notificationRouter.get("/", getNotif);

notificationRouter.post("/", postSetSeen);

module.exports = notificationRouter;
