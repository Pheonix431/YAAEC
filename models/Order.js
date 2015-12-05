var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  total: Number,
  balance_transaction: String
});
  
