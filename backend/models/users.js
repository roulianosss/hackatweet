const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  username: String,
  password: String,
  token: String,
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "tweets" }],
  likedTweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "tweets" }]

});

const User = mongoose.model("users", userSchema);

module.exports = User;
