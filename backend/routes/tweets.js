const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets')
const User = require('../models/users')
const Hashtag = require('../models/hashtags')
const { checkBody } = require('../modules/checkBody');
require("../models/connection");

router.delete('/allHashtag', async(req, res)=> {
  const deleteAll = await Hashtag.deleteMany({})
  res.json(deleteAll)
})

router.delete('/allTweets', async(req, res)=> {
  const deleteAll = await Tweet.deleteMany({})
  res.json(deleteAll)
})
/* GET home page. */
router.get('/allTweets', function(req, res, next) {
  Tweet.find().populate('user').then(data => res.json(data))
});

router.post('/newTweet', (req, res) => {
  const hashtags = req.body.text.match(/#[a-z0-9_]+/)
  const arrOfIdHashtag = []
  hashtags.map(async hashtag => {
    const isExist = await Hashtag.findOne({hashTagName: hashtag})
    if (!isExist){
      const newHashtag = new Hashtag({
        hashTagName: hashtag,
        hashTagTweetsCount: 0
      })
      newHashtag.save().then(data => {
        arrOfIdHashtag.push(data._id.toString())
        addTweet()
        console.log(arrOfIdHashtag)
      });
    } else {
        arrOfIdHashtag.push(isExist._id.toString())
        Hashtag.findByIdAndUpdate(isExist._id, {hashTagTweetsCount: isExist.hashTagTweetsCount + 1})
        addTweet()
      }
    })
    console.log(arrOfIdHashtag);
    function addTweet(){
      const newTweet = new Tweet({
        text: req.body.text,
        user: req.body.userId,
        creationTime: new Date(),
        likesCounter: 0,
        isDeleted: false,
        inHashtagList: arrOfIdHashtag
      });
      newTweet.save().then((data) => res.json(data));
    }

})

router.delete('/deleteTweet/:tweetId', (req, res) => {
    Tweet.deleteOne({ _id: req.params.tweetId}).then(data => res.json(data))
})

router.post('/like', async(req, res)=>{
  const testArray = []
   const likedTweet = await Tweet.findByIdAndUpdate(req.body.tweetId, {likesCounter: req.body.likes + 1})
   const user = await User.findByIdAndUpdate(req.body.userId, {$push: { likedTweets: likedTweet._id }},{
    new: true})
    console.log(req.body.userId)
   res.json(user)
})

module.exports = router;
