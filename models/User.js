var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name: { first : String, last: String },
  local : {
    username: String,
    email: String,
    password: String,
  },
  active: { type: Boolean, default: false },
  token: String,
  phone: Number,
  card : {} // don't worry about this, this is jus
}); 

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("User", UserSchema);
