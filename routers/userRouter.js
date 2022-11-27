const express = require("express");

const {
  postSignin,
  postRegister,
  postFollowed,
  postFollowing,
} = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/signin", postSignin);

userRouter.post("/register", postRegister);

userRouter.post("/:userId", postFollowed);

userRouter.post("/followed/:userId", postFollowing);

module.exports = userRouter;
