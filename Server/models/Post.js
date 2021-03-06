const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    title: String,
    author: String,
    body: String,
  },

  { timestamps: true }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

const Post = model("Post", PostSchema);

module.exports = Post;
