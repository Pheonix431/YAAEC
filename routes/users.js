var mongoose = require("mongoose");
var passport = require("passport");

//models
require('../models/User');
require('../models/Item');
var User = mongoose.model("User");
var Item = mongoose.model("Item");

var express = require('express');
var router = express.Router();
var passport = require("passport");

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* GET users listing. */
router.get('/signup', function(req,res){
  res.render('user/signup');
});

router.get('/login', function(req,res){
  res.render('user/login');
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

router.get("/get/cart", isLoggedIn, function(req ,res, next) {
  User.populate(req.user, {path: 'cart'}, function(err, cart_items) {
    return res.render("user/cart", { cart: req.user.cart, user: req.user });
  });
});

router.post('/add/cart', isLoggedIn, function(req, res, next) {
  Item.find({"_id": req.body.id }, function(err, item){
    req.user.cart.push(item.id);
    req.user.save();
    return res.json(req.user);
  });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  } else {
    req.flash("signupMessage", "You are not logged in!");
    return res.redirect("/");
  }
}

module.exports = router;
