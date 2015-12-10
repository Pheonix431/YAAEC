var mongoose = require('mongoose');

var Review_Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  star: { type: Number, min: 0, max: 5 },
  content: String,
});

mongoose.model("Review", Review_Schema);
