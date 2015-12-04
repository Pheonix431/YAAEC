var mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var search = require("mongoose-text-search");

var ItemSchema = new mongoose.Schema({
  name: { type: String, es_indexed: true },
  static_data: {
    img_url: String
  },
  brand: String,
  price: Number,
  currency: String,
  quantity: Number,
  condition: String,
  UPC: String,
  item_description: { type: String, es_indexed: true },
  product_specification: {},
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
  additional_desc: {}
});

ItemSchema.plugin(search);

ItemSchema.index({name: 'text'});
var Item = mongoose.model("Item", ItemSchema);

/*Item.createMapping(function(err, mapping){
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

*/
