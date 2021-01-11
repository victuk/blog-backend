const User = require('../models/register');
const Blog = require('../models/Blogs');

const theroles = {
    user: "user",
    admin: "admin"
}

function hasAccess(req, res, next){


        Blog.findById(req.params.id, function(err, blog) {
            if(err) {console.log(error)}
            if(req.decoded.id == blog.userID) {
                next();
            } else {
                User.findById(req.decoded.id, function(error, user) {
                    if(error) {res.send('Error = ' + error)}
                    if(user.role == theroles.admin) {
                        next();
                    } else {
                        res.send('You are forbidden from taking this action');
                    }
                })
            }
        })


}

module.exports = hasAccess;