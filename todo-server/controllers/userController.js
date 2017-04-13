var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.authenticate = function(req, res, next){
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
        if(err){
            res.json({
                type: false,
                data: "Error occurred " + err
            });
        } else{
            if(user){
                res.json({
                    type: true,
                    data: user.email,
                    token: user.token
                });
            } else{
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
};

exports.register = function(req, res, next){
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    console.log(user);
                    user.token = jwt.sign(user,"rajat");
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1.email,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
};

exports.me = function(req,res,next){
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occurred: " + err
            });
        } else {
            res.json({
                type: true,
                data: user.email
            });
        }
    });
};