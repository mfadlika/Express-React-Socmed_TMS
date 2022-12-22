const express = require("express");

const {
  postSignin,
  postRegister,
  postFollow,
  postFollowed,
  delUnfollow,
  delUnfollowed,
  getRandom,
  postEditProfile,
  getProfilePicture,
} = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.get("/:userId/profile-picture", getProfilePicture);

userRouter.post("/signin", postSignin);

userRouter.post("/register", postRegister);

userRouter.post("/follow/:userId", postFollow);

userRouter.post("/followed/:userId", postFollowed);

userRouter.delete("/unfollow/:userId", delUnfollow);

userRouter.delete("/unfollowed/:userId", delUnfollowed);

userRouter.post("/:userId/editprofile", postEditProfile);

userRouter.get("/random", getRandom);

module.exports = userRouter;
