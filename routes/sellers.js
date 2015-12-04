var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var middleware = require("../middleware");

require('../models/User');
require('../models/Item');
var Item = mongoose.model("Item");
var User = mongoose.model("User");

router.get("/account", function(req, res, next) {
  return res.render("seller/dashboard");
});

router.get("/sold", middleware.isLoggedIn, isMerchant, function(req, res, next){
});

module.exports = router;

