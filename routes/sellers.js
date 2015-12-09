var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

require('../models/Seller');
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

router.get("/orders", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {
  return res.render("seller/orders", { user: req.user });
});

router.get("/products/all", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {

  Seller.findById(req.user.id).populate("products").exec(function(req,res, next){
      return res.render("seller/view_products", { products:products ,user: req.user});
});

router.get("/add/product", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {
  return res.render("seller/add_product", { user: req.user });
});


router.post("/add/product", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {
  var newItem = new Item();
  
  newItem.name = req.body.name;
  newItem.description = req.body.description;
  newItem.price = req.body.price;
  newItem.condition = req.body.condition;
  newItem.quantity = req.body.quantity;
  newItem.static_data.img_url = req.body.image;

  newItem.save(function(err) {
    req.user.products.push(newItem.id);
    req.user.save();
    if (err) {
      return next(err);
    }
    req.flash("success", "Product successfully submitted!");
    return res.render('index', { success: req.flash("success")[0], failure: req.flash("signupMessage")[0], user: req.user });
});


});
router.get("/dashboard", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {
  return res.render("seller/dashboard", { user: req.user } );
});

router.get("/sold", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next){
});

router.get("/add/card", middleware.isLoggedIn, middleware.isMerchant, function(req, res, next) {
  return res.render("seller/add_card");
});

router.get("/signup", middleware.isLoggedIn, function(req ,res, next) {
  if (req.user.is_seller) {
    req.flash("signupMessage", "You are already a merchant!");
    return res.redirect("/");
  } else {
    return res.render("seller/seller_signup");
  }
});

router.post("/signup", middleware.isLoggedIn, function(req, res, next){
  var newSeller = new Seller();

  newSeller.company.contact.address = {
    street: req.body.street,
    city: req.body.city,
    zipcode: req.body.zipcode,
    country: req.body.country
  };


  newSeller.company.contact.email = (req.body.email) ? req.body.email : req.user.local.email;
  newSeller.company.contact.mobile = req.body.phone;
  newSeller.company.name = req.body.name;

  newSeller.user = req.user.id;
  req.user.is_seller = true;

  newSeller.save(function(err) {
    if (err){
      return next(err);
    }
    req.user.save();
    
    return res.redirect("/sellers/add/card");
  });
});

module.exports = router;