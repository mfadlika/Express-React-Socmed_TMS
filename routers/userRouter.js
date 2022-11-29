const express = require("express");

const {
  postSignin,
  postRegister,
  postFollow,
  postFollowed,
  delUnfollow,
  delUnfollowed,
} = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.post("/signin", postSignin);

userRouter.post("/register", postRegister);

userRouter.post("/follow/:userId", postFollow);

userRouter.post("/followed/:userId", postFollowed);

userRouter.delete("/unfollow/:userId", delUnfollow);

userRouter.delete("/unfollowed/:userId", delUnfollowed);

module.exports = userRouter;
