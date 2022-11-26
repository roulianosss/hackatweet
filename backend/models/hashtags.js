const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  hashtagName: String,
  hashtagInTweetsCount: Number,
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;
