const express = require("express");
const { isAuth } = require("../utils.js");
const {
  postSendPost,
  getFetchData,
  getFetchOneData,
  delData,
  postLike,
  saveComment,
  postPhoto,
} = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", postSendPost);

postRouter.get("/", isAuth, getFetchData);

postRouter.post("/:userId/status/:postId", postSendPost);

postRouter.post("/postlike", isAuth, postLike);

postRouter.get("/:userId", getFetchData);

postRouter.get("/:userId/status/:_id", getFetchOneData);

postRouter.delete("/:userId/status/:_id", delData);

module.exports = postRouter;
