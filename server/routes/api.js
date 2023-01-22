var express = require("express");
var multer = require("multer");
var router = express.Router();

// Import controller
const { initialSetup } = require("../controllers");

// Create multer uploader
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // TODO: make sure this is the correct place
    cb(null, "../static/img");
  },
  filename: function (req, file, cb) {
    // TODO: make sure filenames dont conflict
    console.log(req);
    cb(null, "example.png");
  },
});
const upload = multer({ storage: storage });

// POST /init : Create initial setup
// FIXME DO NOT EXPOSE IN PROD
router.post("/init", function (req, res, next) {
  async function body() {
    await initialSetup();
  }
  body();
  res.send("connecting to mongodb...");
});

// POST /create : Create new page
//   id*      : Unique ID for the page
//   title*   : Title of the page
//   password : Password for editing later
//   next     : Array of links
//   panel    : Image
router.post("/create", upload.single("panel"), function (req, res, next) {
  // TODO create panel
  res.send({ id: "1" });
});

module.exports = router;
