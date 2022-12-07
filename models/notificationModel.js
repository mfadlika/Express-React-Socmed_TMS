const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    type: { type: String, required: true },
    follower: [],
    liker: [],
    seen: { type: String, required: true },
    post: { type: String },
    postId: { type: String },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
