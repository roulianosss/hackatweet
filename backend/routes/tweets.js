const express = require('express');
const router = express.Router();
const Tweet = require('../models/tweets')
const User = require('../models/users')
const Hashtag = require('../models/hashtags')
const { checkBody } = require('../modules/checkBody');
require("../models/connection");

//fetch tout les tweets
router.get('/allTweets', (req, res) => {
  Tweet.find().populate('author').populate('hashtags').then(allTweets => res.json(allTweets))
})

// fetch un nouveau tweet avec gestion des nouveau hashtags
router.post('/newTweet', (req, res) => {
  if (!checkBody(req.body, ['userId', 'tweetContent'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const { userId, tweetContent } = req.body
  const detectedHashtags = [...tweetContent.matchAll(/#[a-z0-9_]+/g)]
  const isHashtags = detectedHashtags.length > 0 ? true : false
  const tweetsIds = []
  let hashtagsCounter = detectedHashtags.length // compteur pour gerer l asynchrone
  isHashtags && detectedHashtags.map(async hashtagObj => {
    const [name] = hashtagObj
    const hashtag = await Hashtag.findOne({hashtagName: name})
    if (!hashtag){
      const newHashtag = new Hashtag({
        hashtagName: name,
        hashtagInTweetsCount: 1
      })
      newHashtag.save().then(newHashtag => {
        tweetsIds.push(String(newHashtag._id))
        hashtagsCounter--
        !hashtagsCounter && addTweet()
      })
    } else {
      await Hashtag.findOneAndUpdate(
        { hashtagName: name },
        { $inc : { hashtagInTweetsCount: 1 } }
      )
      tweetsIds.push(String(hashtag._id))
      hashtagsCounter--
      !hashtagsCounter && addTweet()
      }
    })
    !isHashtags && addTweet()
    function addTweet(){
      const newTweet = new Tweet({
        tweetContent: tweetContent,
        author: userId,
        creationDate: new Date(),
        likesCounter: 0,
        hashtags: tweetsIds
      });
      newTweet.save().then((newTweet) => res.json(newTweet));
    }
})

// fetch la suppression d'un tweet
router.delete('/deleteTweet/:tweetId', async(req, res) => {
  const tweetId = req.params.tweetId
  const deletedTweet = await Tweet.findByIdAndDelete(tweetId)
  deletedTweet.hashtags.map(async hashtag => {
  await Hashtag.findByIdAndUpdate(String(hashtag), { $inc : { hashtagInTweetsCount: -1 }})
  })
  res.json(`The tweet with id: ${tweetId} was deleted`)
})

// fetch un like 
router.post('/like', async(req, res)=>{
  const { tweetId, userId } = req.body
  const likedTweet = await Tweet.findByIdAndUpdate(tweetId, { $inc : { likesCounter: 1 }})
  const user = await User.findByIdAndUpdate(userId, {$push: { likedTweets: likedTweet._id.toString() }}, { new: true })
  res.json(user)
})

// fetch un unlike
router.post('/unlike', async(req, res)=>{
  const { tweetId, userId } = req.body
  const likedTweet = await Tweet.findByIdAndUpdate(tweetId, { $inc : { likesCounter: -1 }})
  const user = await User.findByIdAndUpdate(userId, {$pull: { likedTweets: likedTweet._id.toString() }}, { new: true })
  res.json(user)
})

// fetch une suppression de tout les tweets
router.delete('/allTweets', async(req, res)=> {
  const deletedTweets = await Tweet.deleteMany({})
  res.json(deletedTweets)
})

module.exports = router;
