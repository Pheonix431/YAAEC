var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

require('../models/User');
require('../models/Item');
var Item = mongoose.model("Item");
var User = mongoose.model("User");



