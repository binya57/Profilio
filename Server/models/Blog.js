const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    title: String,
    author: String,
    // author_id: mongoose.ObjectId,
    posts: Array,
    creationDate: Date,
    updateDate: Date,
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
