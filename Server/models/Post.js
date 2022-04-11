const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    author: String,
    body: String,
    creationDate: Date,
    updateDate: Date,
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
