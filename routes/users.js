var mongoose = require("mongoose");
var passport = require("passport");
require("../models/User");

var User = mongoose.model("User");
var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/signup', function(req,res){
  res.render('user/signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

router.post('/login', function(req,res,next) {
  passport.authenticate('local-login', function(err, user, info){
    if (err){
      console.log(err);
      return next(err);
    }
    if (!user){
      return res.json(403, "Your username or password is incorrect");
    }
    if (!user.active){
      return res.json(401, "Your account is not active, please go to your email to activate your account");
    }

    req.login(user, function(err){
      if (err){
        console.log(err);
        return next(err);
      }
      User.populate(user, {path:'-local.password'}, function(err,pop){
      //var redirect_to = req.session.redirect_to ? req.session.redirect_to : '/user/'+user.local.username;
      //return res.redirect(redirect_to);
      return res.json(pop);
      });
    });
  })(req,res,next);
});

module.exports = router;
