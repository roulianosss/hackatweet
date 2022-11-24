const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  hashtagText: String,
  tweetsCount: Number,
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;
