var mongoose = require("mongoose");
require('./User')
require('./Product')
var mongoose = require("mongoose");
var User = mongoose.model("User")
var Product = mongoose.model("Product");
var _ = require("underscore-node");

var BidSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  added: { type: Boolean, default: false },
  amount: Number,
  processed: { type: Boolean, default: false },
  paused: { type: Boolean, default : false },
});

BidSchema.methods.pauseBid = function pauseBid(cb){
  this.paused = true;
  this.save(cb);
};

BidSchema.methods.resumeBid = function resumeBid(cb){
  this.paused = false;
  this.save(cb);
};

BidSchema.methods.increaseBid = function increaseBid(amount, cb){
  this.amount = amount;
  this.save(cb);
};

var Bid = mongoose.model("Bid", BidSchema);

BidSchema.pre("remove", function(next) {
  User.findOneAndUpdate({bids: this._id}, {$pull: {bids: this._id}}, function(err, data){
    if (err) {
      return next(err);
    }
    console.log("Deleted big from user");
  });

  Product.findOneAndUpdate({bidders: this._id}, {$pull: {bidders: this._id}}, function(err, data){
    if (err) {
      return next(err);
    }
    console.log("Deleted from user");
  });
  Product.findOne({"highestBidder": this._id}, function(err, prod) {
    if (prod){
      prod.highestBidder = null;
      Bid.populate(prod, { "path":"bidders", "select": { "bidders.paused": false, "bidders.added":false }}, function(err, pop){
        if (pop.bidders.length > 0) {
          var bidders = _.where(pop.bidders, { "paused": false, "added": false });
          prod.highestBidder = _.sortBy(bidders, "-amount")[0].id;
        } else {
          prod.highestBidder = null;
        }
      });
    }
    next();
  });
});
