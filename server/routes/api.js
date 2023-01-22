var express = require("express");
var router = express.Router();

// Import controller
const { initialSetup } = require("../controllers");

/* GET users listing. */
router.get("/init", function (req, res, next) {
  async function body() {
    await initialSetup();
  }
  body();
  res.send("connecting to mongodb...");
});

module.exports = router;
