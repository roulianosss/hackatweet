var express = require("express");
var router = express.Router();
//
const Hashtag = require("../models/hashtags");
const Tweet = require("../models/tweets");

router.post("/", (req, res) => {
  // Check if the Hastag has not already been created
  Hashtag.findOne({
    hashTagName: { $regex: new RegExp(req.body.hashTagName, "i") },
  }).then((dbData) => {
    if (dbData === null) {
      // Creates new hashtag with attributes
      const newHashTag = new HashTag({
        hashTagName: req.body.hashTagName,
        hashTagTweetsCount: "0",
      });

      // Finally save in database
      newHashTag.save().then(() => {
        HashTag.find().then((data) => {
          console.log(data);
        });
      });

      // ADD TWEET TO HASHTAG
    } else {
      // ADD TWEET TO HASHTAG
    }
  });
});

//
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
