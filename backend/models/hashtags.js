const mongoose = require("mongoose");

const hashtagSchema = mongoose.Schema({
  hashTagName: String,
  hashTagTweetsCount: Number,
});

const Hashtag = mongoose.model("hashtags", hashtagSchema);

module.exports = Hashtag;
