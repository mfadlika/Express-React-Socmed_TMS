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
    profileName: { type: String },
    type: { type: String, required: true },
    postId: { type: String },
    comment: { type: Number },
    username: { type: String, required: true },
    profileName: { type: String },
    like: [likeSchema],
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
