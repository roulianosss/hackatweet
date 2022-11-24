var express = require('express');
var router = express.Router();
const uid2 = require('uid2');

/* GET users listing. */
router.post('/signin', function(req, res, next) {
  const token = uid2(32);
  const hash = bcrypt.hashSync(req.body.password, 10)
  
  const newUser = new User({
    username: req.body.username,
    password: hash,
    token: token,
  });
  newUser.save().then(data => res.json(data))
});

router.post('/signup', (req, res) => {
  User.findOne({ username: req.body.username }).then(data => {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token});
    } else {
      res.json({ result: false });
  }})
})






module.exports = router;
