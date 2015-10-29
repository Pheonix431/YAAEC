var mongoose = require("mongoose");

var CartSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' } 
});

var Cart = mongoose.model("Seller", CartSchema);

module.exports = Cart;


