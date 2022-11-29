const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const ObjectId = require("mongoose").Types.ObjectId;

exports.postSendPost = expressAsyncHandler(async (req, res) => {
  const post = await new Post({
    post: req.body.post,
    username: req.body.username,
    date: new Date(),
  });
  post.save();
});

exports.getFetchData = expressAsyncHandler(async (req, res) => {
  const followingList = await User.find({ username: req.headers.username });
  let data;
  if (!req.params.userId) {
    followingList[0].following.push(req.headers.username);
    data = followingList[0].following;
  } else {
    const checkProfile = await User.find({ username: req.params.userId });
    if (checkProfile.length === 0) {
      return res.status(404).send({ message: "not found" });
    }
    data = req.params.userId;
  }
  const posts = await Post.find({
    username: data,
  }).sort({
    createdAt: -1,
  });
  if (req.headers.username) {
    data = followingList[0].following;
  }
  res.send([posts, data]);
});

exports.getFetchOneData = expressAsyncHandler(async (req, res) => {
  const id = new ObjectId(req.params._id);
  const post = await Post.findById(id);
  const data = [];
  res.send([[post], data]);
});

exports.delData = expressAsyncHandler(async (req, res) => {
  if (req.body.username === req.params.userId) {
    const id = new ObjectId(req.params._id);
    await Post.findByIdAndDelete(id);
  }
});
