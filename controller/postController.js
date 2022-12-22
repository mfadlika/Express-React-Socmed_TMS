const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel.js");
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const ObjectId = require("mongoose").Types.ObjectId;

exports.postSendPost = expressAsyncHandler(async (req, res) => {
  const data = await User.find({ username: req.body.username });
  const [{ profileName }] = data;
  let postId = req.params.postId;

  if (!req.params.postId) {
    postId = null;
  }

  const post = await new Post({
    post: req.body.post,
    type: req.body.type,
    comment: 0,
    postId: postId,
    username: req.body.username,
    profileName: profileName,
    date: new Date(),
  });

  if (req.params.postId) {
    if (await Post.find({ _id: postId })) {
      const post = await Post.findById(postId);
      post.comment += 1;
      post.save();
    }
    await new Notification({
      username: req.params.userId,
      type: "comment",
      commenter: req.body.username,
      post: req.body.post,
      postId: req.params.postId,
      seen: "unseen",
      dateUpdated: new Date(),
      dateBefore: new Date(),
    }).save();
  }

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
    type: "post",
  }).sort({
    createdAt: -1,
  });
  res.send(posts);
});

exports.getFetchOneData = expressAsyncHandler(async (req, res) => {
  const id = new ObjectId(req.params._id);
  const post = await Post.findById(id);
  const comments = await Post.find({ postId: id });

  if (post) {
    if (comments.length === 0) {
      res.send([post, []]);
    } else {
      res.send([post, comments]);
    }
  } else {
    res.send(err);
  }
});

exports.delData = expressAsyncHandler(async (req, res) => {
  if (req.body.username === req.params.userId) {
    const id = new ObjectId(req.params._id);
    await Post.findByIdAndDelete(id);
    // const notif = await Notification.deleteMany({
    //   id,
    // });
  }
});

exports.postLike = expressAsyncHandler(async (req, res) => {
  const id = new ObjectId(req.body.id);
  const post = await Post.findById(id);

  if (!post.like.some((e) => e.liker === req.body.usernameOwner)) {
    post.like.push({ liker: req.body.usernameOwner });
    if (!(await Notification.findOne({ postId: id }))) {
      await new Notification({
        username: post.username,
        liker: req.body.usernameOwner,
        type: "like",
        seen: "unseen",
        post: post.post,
        postId: id,
        dateUpdated: new Date(),
        dateBefore: new Date(),
      }).save();
    } else {
      const like = await Notification.findOne({ postId: id });
      like.seen = "unseen";
      like.liker.push(req.body.usernameOwner);
      like.dateBefore = like.dateUpdated;
      like.dateUpdated = new Date();
      like.save();
    }
  } else {
    post.like.pull({ liker: req.body.usernameOwner });
    const like = await Notification.findOne({ postId: id });
    like.liker.pull(req.body.usernameOwner);
    if (like.liker.length === 0) {
      await Notification.findOneAndRemove({ postId: id });
    } else {
      like.dateUpdated = like.dateBefore;
      like.save();
    }
  }
  await post.save();
  const posted = await Post.findById(id);
  res.send(posted.like);
});
