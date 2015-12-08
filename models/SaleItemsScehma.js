var mongoose = require("mongoose");

var SaleItemsSchemaSchema = new mongoose.Schema({
  name: { first : String, last: String },
  local : {
    username: String,
    email: String,
    password: String,
  },
  active: { type: Boolean, default: false },
  phone: Number,
  card : {} // don't worry about this, this is jus
});


mongoose.model("User", SaleItemsSchema);


