const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const Notification = require("../models/notificationModel.js");
const { generateToken } = require("../utils.js");

exports.postSignin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        following: user.following,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid username or password" });
});

exports.postRegister = expressAsyncHandler(async (req, res) => {
  const userCheck = await User.findOne({ username: req.body.username });
  const emailCheck = await User.findOne({ email: req.body.email });
  const forbiddenUsername = ["profile", "user", "admin"];
  if (userCheck || emailCheck) {
    if (userCheck && emailCheck) {
      return res
        .status(401)
        .send({ message: "Username and email already existed" });
    } else if (userCheck && !emailCheck) {
      return res.status(401).send({ message: "Username already existed" });
    } else {
      return res.status(401).send({ message: "Email already existed" });
    }
  } else if (forbiddenUsername.includes(req.body.username)) {
    return res.status(401).send({ message: "Username forbidden" });
  } else if (req.body.username.length < 4) {
    return res
      .status(401)
      .send({ message: "Username must be 4 characters minimum" });
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password);
  const user = await new User({
    username: username,
    email: email,
    password: password,
  });
  user
    .save()
    .then(() => {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        following: user.following,
        token: generateToken(user),
      });
    })
    .catch((err) => {
      res.status(404).send({ message: err });
    });
});

exports.postFollow = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user.following.includes(req.params.userId)) {
    return;
  }
  user.following.push(req.params.userId);
  await user.save().then(
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      following: user.following,
      token: generateToken(user),
    })
  );
});

exports.postFollowed = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.userId });
  console.log(user);
  if (user.follower.includes(req.body.username)) {
    return;
  } else {
    // if (!(await Notification.findOne({ postId: user._id }))) {
    await new Notification({
      username: req.params.userId,
      type: "follow",
      follower: req.body.username,
      seen: "unseen",
      postId: user._id,
    }).save();
    // }
    // else {
    //   const follow = await Notification.findOne({
    //     postId: user._id,
    //   });
    //   follow.follower.push(req.body.username);
    //   follow.save();
    // }
  }
  user.follower.push(req.body.username);
  await user.save();
});

exports.delUnfollow = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user.following.includes(req.params.userId)) {
    return;
  }
  user.following.pull(req.params.userId);
  await user.save().then(
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      following: user.following,
      token: generateToken(user),
    })
  );
});

exports.delUnfollowed = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ username: req.params.userId });
  if (!user.follower.includes(req.body.username)) {
    return;
  } else {
    const unfollow = await Notification.findOne({ postId: user._id });
    unfollow.follower.pull(req.body.username);
    if (unfollow.follower.length === 0) {
      await Notification.findOneAndRemove({ postId: user._id });
    } else {
      unfollow.save();
    }
  }
  user.follower.pull(req.body.username);
  await user.save();
});

exports.getRandom = expressAsyncHandler(async (req, res) => {
  const whoToFollow = await User.find();
  const user = await User.findOne({ username: req.headers.username });
  const { following } = user;
  following.push(req.headers.username);
  list = whoToFollow.map((props) => {
    return props.username;
  });
  list = list.filter((val) => !following.includes(val));
  shuffleList = list
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  res.send([shuffleList[0], shuffleList[1], shuffleList[2]]);
});
