var express = require("express")
var router = express.Router()
const uid2 = require("uid2")
const bcrypt = require("bcrypt")
const User = require('../models/users')
const { checkBody } = require('../modules/checkBody')
require("../models/connection")

// fetch tout les utilisateurs
router.get('/allUsers', async(req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
})


// fetch un nouvel utilisateur
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const { username, password, firstname } = req.body

  User.findOne({ username: username }).then(data => {
    
    if (data === null) {
      const token = uid2(32)
      const hash = bcrypt.hashSync(password, 10);

      const newUser = new User({
        firstname: firstname,
        username: username,
        password: hash,
        token: token,
        isConnected: true,
        likedTweet: []
      })
      newUser.save().then((data) => res.json(data));
    } else {
      res.json({ result: false, error: 'User already exists' });
    }
  })
})

// fetch une connection utilisateur
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  
  const { username, password } = req.body

  User.findOne({ username: username }).then(user => {
    if (data && bcrypt.compareSync(password, user.password)) {
      res.json(data);
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  })
})

// fetch une supression de tout les utilisateurs
router.delete('/allUsers', async(req, res) => {
  const deleteAllUsers = await User.deleteMany({})
  res.json(deleteAllUsers)
})

module.exports = router;
