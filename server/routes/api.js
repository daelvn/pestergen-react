var express = require("express");
var multer = require("multer");
var path = require("path");
var mime = require("mime-types");
var fs = require("fs");
var router = express.Router();

// Import nanoid
const { nanoid } = require("nanoid");

// Import controllers
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

// POST /create : Create new page
//   id*      : Unique ID for the page
//   title*   : Title of the page
//   password : Password for editing later
//   links    : Array of links
//   log      : Log
//   panel    : Image
router.post("/create", upload.single("panel"), async function (req, res, next) {
  console.log("REQUEST:", req.body);
  //console.log("UPLOAD:", req.file);
  // TODO create panel
  const page = new Page({
    id: req.body.id != null ? String(req.body.id) : nanoid(9),
    title: req.body.title,
    password: req.body.password,
    log: req.body.lines,
    links: req.body.links,
    panel: { uri: req.file.filename, kind: req.file.mimetype },
  });
  await page.save();
  res.send({ id: page.id });
});

// GET /view/:id : View a page from the database
router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let page = await Page.findOne({ id }).exec();
  if (!page) {
    res.send({ error: "Page not found" });
  } else {
    res.send({ ...page._doc, password: undefined, _id: undefined, __v: undefined });
  }
});

module.exports = router;
