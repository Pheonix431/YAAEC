var mongoose = require('mongoose');

var Seller_Schema = new mongoose.schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company: { 
    contact: {
      email: String,
      mobile: String,
      address: {
        street: String,
        city: String,
        zipcode: String,
        country: String
      }
    },
    name: String
  }, 
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  sold: [{ 
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    count: Number
  }],
  rating: Number,
});

mongoose.model('Seller', Seller_Schema);


