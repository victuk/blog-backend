var express = require('express');
var router = express.Router();
var regUser = require('../models/register');
require('dotenv').config();
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.secretkey;

router.post('/', (req, res) => {
    if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;
        regUser.getUserByEmail(email, (err, user) => {
            if (!user) {
                res.status(404).json({ message: 'The user does not exist!' });
            } else {
                regUser.comparePassword(password, user.password, (error, isMatch) => {
                    if (error) throw error;
                    if (isMatch) {
                        const payload = { id: user.id };
                        const token = jwt.sign(payload, jwtOptions.secretOrKey);
                        res.json({ message: 'ok', token, email: email });
                    } else {
                        res.status(401).json({
                            message: 'The password is incorrect!'
                        });
                    }
                });
            }
        });
    } else {
        res.send('You need to imput a valid username and password.');
    }
});

module.exports = router;