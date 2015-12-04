var mongoose = require.('mongoose');

var Seller_Schema = new mongoose.schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company: { 
    contact: {
      email: String,
      mobile: String,
      business: String,
      address: String
    },
    name: String
  }, 
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  rating: Number,
});

mongoose.model('Seller', Seller_Schema);


