const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  creationTime: Date,
  likesCounter: Number,
  isDeleted: Boolean,
  inHashtagList: [{ type: mongoose.Schema.Types.ObjectId, ref: "hashtags" }],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
