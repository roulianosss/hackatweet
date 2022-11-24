const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets')
const { checkBody } = require('../modules/checkBody');
require("../models/connection");

/* GET home page. */
router.get('/allTweets', function(req, res, next) {
  Tweet.find().populate('user').then(data => res.json(data))
});

router.post('/newTweet', (req, res) => {
    const newTweet = new Tweet({
        text: req.body.text,
        user: req.body.userId,
        creationTime: new Date(),
        likesCounter: 0,
        isDeleted: false,
        inHashtagList: []
      });
      newTweet.save().then((data) => res.json(data));

})

router.delete('/deleteTweet/:tweetId', (req, res) => {
    Tweet.deleteOne({ _id: req.params.tweetId}).then(data => res.json(data))
})

// router.post('/like')

module.exports = router;
