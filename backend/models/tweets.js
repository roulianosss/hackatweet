const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  tweetContent: String,
  creationDate: Date,
  likesCounter: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hashtags: [{ type: mongoose.Schema.Types.ObjectId, ref: "hashtags" }],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
