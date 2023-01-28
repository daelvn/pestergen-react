var express = require("express");
var multer = require("multer");
var path = require("path");
var mime = require("mime-types");
var fs = require("fs");
var router = express.Router();

// Import nanoid
const { nanoid } = require("nanoid");

// Import controllers
const { initialSetup } = require("../controllers");
const { Page } = require("../controllers/Page");

// Create multer uploader
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/../public/static/img/"));
  },
  filename: function (req, file, cb) {
    let filename = `${req.body.id}.${mime.extension(file.mimetype)}`;
    if (fs.existsSync(path.join(__dirname, `/../public/static/img/${filename}`))) {
      filename = `${req.body.id}.${Date.now()}.${mime.extension(file.mimetype)}`;
    }
    cb(null, filename);
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
//   links    : Array of links
//   log      : Log
//   panel    : Image
router.post("/create", upload.single("panel"), function (req, res, next) {
  console.log("REQUEST:", req.body);
  //console.log("UPLOAD:", req.file);
  // TODO create panel
  const page = new Page({
    id: req.body.id != null ? String(req.body.id) : nanoid(9),
    title: req.body.title,
    password: req.body.password,
    log: JSON.parse(req.body.lines),
    links: JSON.parse(req.body.links),
    panel: req.file.filename,
  });
  res.send({ id: page.id });
});

module.exports = router;
