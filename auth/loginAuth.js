const jwt = require('jsonwebtoken');
const jwtOptions = {};
require('dotenv').config();
jwtOptions.secretOrKey = process.env.secretkey;

function authLogin(req, res, next){
    const token = req.body.token || req.headers.token;
    if(token){
        jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded){
            if(err){
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.send('You will need to login');
    }
}

module.exports = authLogin;