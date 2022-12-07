const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel.js");
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const ObjectId = require("mongoose").Types.ObjectId;

exports.getNotif = expressAsyncHandler(async (req, res) => {
  const like = await Notification.find({
    username: req.headers.username,
  }).sort({ updatedAt: -1 });
  const newLike = await Notification.find({
    username: req.headers.username,
    seen: "unseen",
  });
  res.send([like, newLike]);
});

exports.postSetSeen = expressAsyncHandler(async (req, res) => {
  const seen = await Notification.find({ username: req.body.username });
  seen.map((props) => {
    props.seen = "seen";
    props.save()
  });
});
