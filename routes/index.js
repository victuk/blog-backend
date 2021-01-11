var express = require('express');
var router = express.Router();
var Blog = require('../models/Blogs');
var passport = require('passport');
var regUser = require('../models/register');
const authLogin = require('../auth/loginAuth');
const hasAccess = require('../auth/accessControl')


/* GET home page. */
router.get('/', authLogin, function(req, res) {
    Blog.find({}, 'blogHead blogBody userID', function(error, blogs) {
      if(error) {console.log(error)}
      res.json({
        blogs,
        userId: req.decoded.id,
      });
    })
});





router.get('/view-blogger-profile/:id', authLogin, function(req, res) {
  regUser.findById(req.params.id, 'name email status role', function(error, user) {
    if(error) {console.log(error)}
    res.json({
      user
    })
  })
});

router.post('/', authLogin, function(req, res) {
  if (req.body.blogbody && req.body.bloghead) {
    const post = new Blog({
      userID: req.decoded.id,
      blogHead: req.body.bloghead,
      blogBody: req.body.blogbody
    });
      post.save(function(error, post) {
      if(error) {console.log(error)}
      res.send("This Saved Successfully");
    });
  } else {
    res.send('Your input details are not complete.');
}
});

router.get('/single-blog/:id', authLogin, function(req, res){
  Blog.find({id: req.params.id}, 'blogHead blogBody', function(error, blog){
    if(error) {console.log(error)}
    if(blog == '') {
      res.send('Blog dosent exist')
    } else {
      res.send(blog)
    }
  })
});

router.put('/edit-blog/:id', authLogin, hasAccess, function(req, res) {
  if (req.body.blogbody && req.body.bloghead) {
  Blog.findById(req.params.id, 'blogHead blogBody', function(error, blogs) {
    if(error) {console.log(error)}

    blogs.blogBody = req.body.blogbody
    blogs.blogHead = req.body.bloghead
    
    blogs.save(function(error, blogs) {
      if(error) {console.log(error)}
      res.send(blogs)
    });
  })
}  else {
  res.send('Your input details are not complete.');
}
});



router.delete('/:id', authLogin, hasAccess, function(req, res) {
  Blog.findOneAndDelete(req.params.id, function(error, doc) {
    if(error) {console.log(error)}
    res.send(doc);
  })
});

module.exports = router;
