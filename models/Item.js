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
  item_description: String
});

mongoose.model("Item", ItemSchema);

