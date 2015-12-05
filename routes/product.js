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

router.get('/product/:productID',function(req ,res, next) {
res.render('Product')
});

router.get('/product/get/:productID',function(req ,res, next){

Item.findById(req.params.productID, function(err,product){
   if (err){
      return next(err);
   }
   if (!product){
      return res.send(404, "Not found");
   }
   return res.json(product);
})
});



