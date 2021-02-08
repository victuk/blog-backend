var express = require('express');
var router = express.Router();
var regUser = require('../models/register');




router.post('/', function (req, res) {
    if (req.body.name && req.body.email && req.body.password) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const status = req.body.status
    const role = req.body.role;

    const newUser = new regUser({
        name,
        email,
        password,
        status,
        role
    });

    regUser.getUserByEmail(email, (err, user) => {
        if (!user) {
            regUser.createUser(newUser, function (error, user) {
                if (error) {
                    res.status(422).json({
                        message: 'Something went wrong!'
                    })
                }
                res.json({ message: 'ok', user });
            });
        } else {
            res.json({message: "This email is already used"});
        } 
    });
    

} else {
    res.json({message: 'Your input details are not complete.'});
}
    
});

module.exports = router;