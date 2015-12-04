


module.exports = {
  isLoggedIn: function(req, res, next){
    if (req.isAuthenticated()){
      return next();
    } else {
      req.flash("signupMessage", "You are not logged in!");
      return res.redirect("/");
    }
  },
  hasCard: function(req, res, next) {
    User.findOne({"_id":req.user.id}, function(err, user){
      if (err){
        console.log(err);
        return next(err);
      }
      if (!user){
        console.log("User not found");
        req.flash("failure", "User not found!");
        return res.send(404);
      }
      if (!user.customer_details) {
        req.flash("message", "You have no credit/debit card on this account. Please add one.")
        return res.redirect("/add/card");
      }
      return next();
    });
  },
  isMerchant: function(req, res, next){
    (!req.user.is_seller){
      req.flash("signupMessage", "You are not merchant!");
      return res.redirect("/");
    } else {
      return next();
    }
  }
}