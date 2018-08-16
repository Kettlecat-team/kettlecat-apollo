var express = require("express");
var router = express.Router();
var auth = require("../controllers/AuthController.js");

// route for register action
router.post("/register", auth.doRegister);

// route for login action
router.post("/login", auth.doLogin);

// route for logout action
router.get("/logout", auth.logout);

module.exports = router;
