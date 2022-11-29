const express = require("express");
const { isAuth } = require("../utils.js");
const { postSendPost, getFetchData, getFetchOneData, delData } = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", postSendPost);

postRouter.get("/", isAuth, getFetchData);

postRouter.get("/:userId", getFetchData);

postRouter.get("/:userId/status/:_id", getFetchOneData);

postRouter.delete("/:userId/status/:_id", delData);

module.exports = postRouter;
