var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { success: req.flash("success")[0], failure: req.flash("signupMessage")[0] });
});

module.exports = router;
