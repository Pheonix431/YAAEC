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

var middleware = require("../middleware");

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

router.get("/get/cart", middleware.isLoggedIn, function(req ,res, next) {
  User.populate(req.user, {path: 'cart'}, function(err, cart_items) {
    return res.render("user/cart", { cart: JSON.stringify(cart_items.cart), user: req.user });
  });
});

router.get("/add/card", middleware.isLoggedIn, function(req, res, next) {
  return res.render("add_card");
});

router.get("/checkout", middleware.isLoggedIn, function(req, res, next) {
  User.populate(req.user, {path: 'cart'}, function(err, cart_items) {
    return res.render("checkout", { user: JSON.stringify(req.user), items: JSON.stringify(cart_items.cart) });
  });
});

router.post("/checkout", middleware.isLoggedIn, function(req, res, next) {
});

router.post('/add/cart', middleware.isLoggedIn, function(req, res, next) {
  Item.findOne({"_id": req.body.id }, function(err, item) {
    req.user.cart.push(item.id);
    req.user.save();
    return res.redirect("/users/get/cart");
  });
});

router.delete("/delete/cart/:id", middleware.isLoggedIn, function(req, res, next) {
  req.user.cart.remove(req.params.id);
  req.user.save();
  
  return res.send(200);
});

router.post("/add/card", function(req, res, next) {
  stripe.customers.create({
    description: "Customer for " + req.user.local.email,
    source: req.body.customerToken
  }, function(err, customer) {
    if (err) {
      console.log("err");
      return res.status(406).json(err.raw.code);
    }
    console.log("Customer detail..");
    var metadata = customer.sources.data[0];
    var errors = {};

    metadata.address_line1_check == 'fail' ? (errors["address1"] = true) : (console.log("Check"))
    metadata.address_zip_check == 'fail' ? (errors["zip"] = true) : (console.log("Check"))

    if (Object.keys(errors).length > 0) {
      stripe.customers.del(
        customer.id,
        function(err, confirmation) {
        }
      );
      return res.status(406).json(errors);
    }

    req.user.customer_details = customer;
    req.user.customer_id = customer.id;
    req.user.markModified("customer_details");
    req.user.save();
    return res.json(req.user);
  });
});

module.exports = router;
