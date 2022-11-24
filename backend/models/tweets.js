const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweeto: String,
  owner: String,
  likeCount: Number,
  isDeleted: Boolean,
  inHashtag: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
