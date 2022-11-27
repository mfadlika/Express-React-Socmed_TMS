const express = require("express");
const { isAuth } = require("../utils.js");
const { postSendPost, getFetchData } = require("../controller/postController");

const postRouter = express.Router();

postRouter.post("/", postSendPost);

postRouter.get("/", isAuth, getFetchData);

postRouter.get("/:userId", getFetchData);

module.exports = postRouter;
