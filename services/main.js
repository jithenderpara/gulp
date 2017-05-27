var express = require("express");
var utils = require('../utils');
var path = require("path");// path is require for getting path frm middelware
var userSession = require("../usersession");
var router = express.Router();


router.get("/", function (req, res) {
    res.sendView("index.html");
});
router.get("/login", function (req, res) {
    res.sendView("index.html");
});
router.get('/dashboard', utils.requireLogin, function (req, res) {
    res.sendView("Dashboard.html");
});
module.exports = router;