const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    liker: { type: String },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    post: { type: String, required: true },
    username: { type: String, required: true },
    profileName: { type: String },
    like: [likeSchema],
    comment: [],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
