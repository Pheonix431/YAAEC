var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
  name: String,
  static_data: {
    img_url: String
  },
  brand: String,
  price: Number,
  currency: String,
  quantity: Number,
  condition: String,
  UPC: String,
  item_description: String,
  product_specification: {},
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  additional_desc: {}
});

mongoose.model("Item", ItemSchema);

