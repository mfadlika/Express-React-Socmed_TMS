const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");
const { generateToken } = require("../utils.js");

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
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
          token: generateToken(user),
        });
      })
      .catch((err) => {
        res.status(404).send({ message: err });
      });
  })
);

userRouter.post(
  "/:userId",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user.following.includes(req.params.userId)) {
      return;
    }
    user.following.push(req.params.userId);
    await user.save();
  })
);

userRouter.post(
  "/followed/:userId",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.userId });
    if (user.follower.includes(req.body.username)) {
      return;
    }
    user.follower.push(req.body.username);
    await user.save();
  })
);

module.exports = userRouter;
