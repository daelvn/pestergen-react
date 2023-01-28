var express = require("express");
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get(["/", "/create", "/view/*", "/404"], function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

module.exports = router;
