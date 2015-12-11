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

router.param('product_id', function(req, res, next) {
  Item.findById(req.params.product_id).populate("reviews reviews.user").exec(function(err, prod){
    if (err) {
      return next(err);
    }
    if (!prod) {
      return res.send(404, "Not found");
    }
    req.product = prod;
    return next();
  });
});

router.get('/:product_id', function(req ,res, next) {
    return res.render('product', { product: JSON.stringify(req.product), user: req.user });
});



module.exports = router;
