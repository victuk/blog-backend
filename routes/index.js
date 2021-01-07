var express = require('express');
var router = express.Router();
var Blog = require('../models/Blogs');
var passport = require('passport');
var regUser = require('../models/register');
const authLogin = require('../auth/loginAuth');

/* GET home page. */
router.get('/', authLogin, function(req, res) {
    Blog.find({}, 'blogHead blogBody', function(error, blogs) {
      if(error) {console.log(error)}
      res.json({blogs});
    })
});

router.get('/:id', authLogin, function(req, res){
  Blog.find({id: req.params.id}, 'blogHead blogBody', function(error, blog){
    if(error) {console.log(error)}
    if(blog == '') {
      res.send('Blog dosent exist')
    } else {
      res.send(blog)
    }
  })
});

router.get('/view-profile', authLogin, function(req, res) {
  regUser.findById(req.body.email, 'name email', function(error, user) {
    if(error) {console.log(error)}
    res.send(
      user
    )
  })
});


router.post('/', authLogin, function(req, res) {
  const post = new Blog({
    blogHead: req.body.bloghead,
    blogBody: req.body.blogbody
  });
    post.save(function(error, post) {
    if(error) {console.log(error)}
    res.send("This Saved Successfully");
  });
});

router.put('/:id', authLogin, function(req, res) {
  Blog.findById(req.params.id, 'blogHead blogBody', function(error, blogs) {
    if(error) {console.log(error)}

    blogs.blogBody = req.body.blogbody
    blogs.blogHead = req.body.bloghead
    
    blogs.save(function(error, blogs) {
      if(error) {console.log(error)}
      res.send(blogs)
    });
  })
});

router.delete('/:id', authLogin, function(req, res) {
  Blog.findOneAndDelete(req.params.id, function(error, doc) {
    if(error) {console.log(error)}
    res. send(doc)
  })
});

module.exports = router;
