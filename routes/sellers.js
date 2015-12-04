var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

require ('../models/Seller');
require('../models/User');
require('../models/Item');
var User = mongoose.model("User");
var Item = mongoose.model("Item");
var Seller = mongoose.model("Seller");

var middleware = require("../middleware");

require('../models/User');
require('../models/Item');
var Item = mongoose.model("Item");
var User = mongoose.model("User");

router.get("/dashboard", function(req, res, next) {
  return res.render("seller/dashboard");
});

router.get("/sold", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next){
});

router.get("/add/card", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next){
  return res.render("seller/add_card");
});

router.get("/signup", middleware.isLoggedIn, function(req ,res, next) {
  return res.render("seller/seller_signup");
});

router.post("/signup", middleware.isLoggedIn, function(req, res, next){
  var newSeller = new Seller();

  newSeller.company.contact.address = {
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode,
    country: req.body.country
  };

  debugger;

  newSeller.company.contact.email = (req.body.email) ? req.body.email : req.user.local.email;
  newSeller.company.contact.mobile = req.body.phone;
  newSeller.company.name = req.body.name;

  newSeller.user = req.user.id;
  req.user.is_seller = true;
  debugger;

  newSeller.save(function(err) {
    if (err){
      return next(err);
    }
    req.user.save();
    
    return res.redirect("/sellers/add/card");
  });
});

module.exports = router;

