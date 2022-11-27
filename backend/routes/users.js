const express = require("express")
const router = express.Router()
const uid2 = require("uid2")
const bcrypt = require("bcrypt")
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')
const defaultAvatar = require('../assets/defaultAvatar')
require("../models/connection")

// fetch tout les utilisateurs
router.get('/allUsers', async(req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
})



router.get('/:userId', async(req, res) =>  {
  const user = await User.findById(req.params.userId).lean().exec()
  res.json(user)
})

// fetch un nouvel utilisateur



router.post('/signup', async(req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const { username, password, firstname } = req.body
  const response = await User.findOne({ username: username })
  if (response === null) {
    const token = uid2(32)
    const hash = bcrypt.hashSync(password, 10);

    const newUser = await new User({
      firstname: firstname,
      username: username,
      avatar: defaultAvatar,
      password: hash,
      token: token,
      isConnected: true,
      likedTweet: []
    })
    const data = await newUser.save()
    const user = await User.findById(data._id).lean().exec();
    res.json(user)
  } else {
    res.json({ result: false, error: 'User already exists' });
  }
})

// fetch une connection utilisateur
router.post('/signin', async(req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const { username, password } = req.body
  const user = await User.findOne({ username: username })
  if (user && bcrypt.compareSync(password, user.password)) {
    const data = await User.findById(user._id).lean().exec();
    res.json(data)
  } else {
    res.json({ result: false, error: 'User not found or wrong password' });
  }
})

// fetch une supression de tout les utilisateurs
router.delete('/allUsers', async(req, res) => {
  const deleteAllUsers = await User.deleteMany({})
  res.json(deleteAllUsers)
})

module.exports = router;
