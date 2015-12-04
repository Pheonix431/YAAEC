var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

require('../models/User');
require('../models/Item');
var Item = mongoose.model("Item");
var User = mongoose.model("User");

router.get("/account", function(req, res, next) {
  return res.render("seller/dashboard");
});

module.exports = router;

