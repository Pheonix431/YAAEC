var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

require('../models/User');
require('../models/Item');
var Item = mongoose.model("Item");
var User = mongoose.model("User");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { success: req.flash("success")[0], failure: req.flash("signupMessage")[0], user: req.user });
});

router.get('/test', function(req ,res ,next){
  return res.json(req.query.as);
});

router.get('/create', function(req, res ,next) {
  var newItem = new Item();
  newItem.name = req.query.name;
  newItem.brand = req.query.brand;
  newItem.static_data.img_url = req.query.img_url;
  newItem.price = req.query.price;
  newItem.condition = req.query.condition;
  newItem.item_description = req.query.description;

  newItem.save(function(err) {
    if (err) {
      return next(err);
    }
    return res.json("SUCES");
  });
});

router.get('/all', function(req, res, next){
  return res.render("all");
});

router.get('/get/all', function(req, res, next){
  Item.find(function(err, items){
    return res.json(items);
  });
});

module.exports = router;
