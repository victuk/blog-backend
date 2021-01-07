var express = require('express');
var router = express.Router();
const authLogin = require('../auth/loginAuth');
var regUser = require('../models/register');

/* GET users listing. */
router.get('/profile', authLogin, function(req, res) {
  regUser.findById(req.decoded.id, function(err, user) {
    if (err) {console.log(err)}
    res.json({
      Name: user.name,
      Email: user.email,
      Role: user.role
    })
  });
});

module.exports = router;
