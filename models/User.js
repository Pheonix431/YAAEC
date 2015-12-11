var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name: { first : String, last: String },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  local : {
    username: String,
    email: String,
    password: String,
  },
  active: { type: Boolean, default: false },
  token: String,
  shipping_address:{ address1: String, address2: String, city: String, state: String, zipcode: String},
  phone: Number,
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
  purchased: [{ type: mongoose.Schema.Types.ObjectId }],
  is_seller: { type: Boolean, default: false },
  loyalty_points: Number,
  card : {}, // don't worry about this, this is jus
  customer_details: {},
  card: {},
  customer_id: String
}); 

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("User", UserSchema);

