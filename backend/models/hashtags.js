const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  tweetsCount: Number,
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;
