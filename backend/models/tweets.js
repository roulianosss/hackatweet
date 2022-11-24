const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweeto: String,
  owner: String,
  creationTime: Date,
  likesCounter: Number,
  isDeleted: Boolean,
  inHashtagList: String,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
