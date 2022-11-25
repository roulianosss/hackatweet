const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets')
const User = require('../models/users')
const Hashtag = require('../models/hashtags')
const { checkBody } = require('../modules/checkBody');
require("../models/connection");

router.delete('/allHashtags', async(req, res)=> {
  const deleteAll = await Hashtag.deleteMany({})
  res.json(deleteAll)
})
router.get('/allHashtags', async(req, res)=> {
  const allHashtag = await Hashtag.find()
  res.json(allHashtag)
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
  const hashtags = [...req.body.text.matchAll(/#[a-z0-9_]+/g)]
  const arrOfIdHashtag = []
  let arrItemCount = hashtags.length
  hashtags.length && hashtags.map(async hashtag => {
    const isExist = await Hashtag.findOne({hashTagName: hashtag[0]})
    if (!isExist){
      const newHashtag = new Hashtag({
        hashTagName: hashtag[0],
        hashTagTweetsCount: 1
      })
      newHashtag.save().then(data => {
        arrOfIdHashtag.push(data._id.toString())
        arrItemCount--
        arrItemCount === 0 && addTweet()
      });
    } else {
      await Hashtag.findOneAndUpdate({ hashTagName: hashtag[0] }, { $inc : { hashTagTweetsCount: 1 }})
      arrOfIdHashtag.push(isExist._id.toString())
      arrItemCount--
      arrItemCount === 0 && addTweet()
      }
    })
    !hashtags.length && addTweet()
    function addTweet(){
      console.log(arrOfIdHashtag)
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

router.delete('/deleteTweet/:tweetId', async(req, res) => {
    const deletedTweet = await Tweet.findByIdAndDelete(req.params.tweetId)
    deletedTweet.inHashtagList.map(async hashtag => {
      const updatedHashtag = await Hashtag.findByIdAndUpdate(hashtag.toString(), { $inc : { hashTagTweetsCount: -1 }})
      console.log(updatedHashtag)
    })
    
    res.json('deleted')
})

router.post('/like', async(req, res)=>{
  console.log(req.body.userId)
   const likedTweet = await Tweet.findByIdAndUpdate(req.body.tweetId, { $inc : { likesCounter: 1 }})
   const user = await User.findByIdAndUpdate(req.body.userId, {$push: { likedTweets: likedTweet._id.toString() }},{
    new: true})
   res.json(user)
})

module.exports = router;
