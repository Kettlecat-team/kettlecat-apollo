var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Post registration
userController.doRegister = function(req, res) {
  User.register(
    new User({ username: req.body.username, name: req.body.name }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render("register", { user: user });
      }

      passport.authenticate("local")(req, res, function() {
        res.redirect("/graphql");
      });
    }
  );
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate("local")(req, res, function() {
    res.redirect("/graphql");
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect("/graphql");
};

module.exports = userController;
