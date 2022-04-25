const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    userName: { type: String, required: true },
    title: String,
    description: String,
  },
  { timestamps: true }
);

ProfileSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "profileId",
});
ProfileSchema.set("toObject", { virtuals: true });
ProfileSchema.set("toJSON", { virtuals: true });

const Profile = model("Profile", ProfileSchema);

module.exports = Profile;
