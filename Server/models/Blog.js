const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    title: String,
    author: String,
    // author_id: mongoose.ObjectId,
    creationDate: Date,
    updateDate: Date,
  },
  { timestamps: true }
);

BlogSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "blogId",
});

BlogSchema.set("toObject", { virtuals: true });
BlogSchema.set("toJSON", { virtuals: true });

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
