var express = require('express');
var router = express.Router();
var regUser = require('../models/register');




router.post('/', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new regUser({
        name,
        email,
        password
    });

    regUser.getUserByEmail(email, (err, user) => {
        if (!user) {
            regUser.createUser(newUser, function (error, user) {
                if (error) {
                    res.status(422).json({
                        message: 'Something went wrong!'
                    })
                }
                res.send({ user });
            });
        } else {
            res.send("This email is already used");
        } 
    });
    


    
});

module.exports = router;