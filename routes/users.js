var express = require('express');
var router = express.Router();
const authLogin = require('../auth/loginAuth');
var regUser = require('../models/register');

/* GET users listing. */
router.get('/profile', authLogin, function(req, res) {
  regUser.findById(req.decoded.id, 'name email status role', function(err, user) {
    if (err) {console.log(err)}
    res.json({
      user
    })
  });
});

router.put('/edit-status', authLogin, function(req, res) {
  if (req.body.updateStatus) {
  regUser.findById(req.decoded.id, 'blogHead blogBody status', function(error, blogs) {
    if(error) {console.log(error)}
    
    blogs.status = req.body.updateStatus
    
    blogs.save(function(error, blogs) {
      if(error) {console.log(error)}
      res.json({message: 'ok', blogs})
    });
  })
}  else {
  res.json({message:'Your type in a valid status.'});
}
});

module.exports = router;
