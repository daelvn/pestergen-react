var express = require("express");
var path = require("path");
var router = express.Router();

/* GET home page. */
router.get(["/", "/create", "/view/*", "/404", "/list"], function (req, res, next) {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

// TODO redirect nofounds to 404

module.exports = router;
