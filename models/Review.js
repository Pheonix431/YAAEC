var mongoose = require.('mongoose');

var Review_Schema = new mongoose.schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  ItemID: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  Desc: String,
  Star: { type: Number, min: 0, max: 5 }
});

mongoose.model("Review", Review_Schema);
