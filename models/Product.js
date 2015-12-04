var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
  item : { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },  
  SKU: String,
});
  
