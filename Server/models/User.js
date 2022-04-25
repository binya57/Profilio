const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    userProfileId: Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
