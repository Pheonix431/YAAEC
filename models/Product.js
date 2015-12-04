var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  item : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },  
  SKU: String,
  UPC: String,
  auction: {
    start: Date,
    end: Date
  },
  bidders: [{  type: mongoose.Schema.Types.ObjectId, ref: "Bid" }]
});
  
