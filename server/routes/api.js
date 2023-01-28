var express = require("express");
var multer = require("multer");
var path = require("path");
var mime = require("mime-types");
var fs = require("fs");
var SHA256 = require("crypto-js/sha256");
var router = express.Router();

// Import nanoid
const { nanoid } = require("nanoid");

// Import controllers
const { Page } = require("../controllers/Page");
const e = require("express");

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
//   salt     : Password salt
//   links    : Array of links
//   log      : Log
//   panel    : Image
router.post("/create", upload.single("panel"), async function (req, res, next) {
  console.log("REQUEST:", req.body);
  //console.log("UPLOAD:", req.file);
  // create page
  let salt = nanoid(21);
  const page = new Page({
    id: req.body.id != null ? String(req.body.id) : nanoid(9),
    title: req.body.title,
    password: req.body.password ? SHA256(req.body.password + salt) : null,
    salt: salt,
    log: req.body.lines,
    links: req.body.links != null ? req.body.links : "[]",
    panel: { uri: req.file.filename, kind: req.file.mimetype },
  });
  await page.save();
  res.send({ id: page.id });
});

// POST /auth : Check that password exists and return token
router.post("/auth", async function (req, res, next) {
  const page = await Page.findOne({ id: req.body.id }).exec();
  if (!page.password) {
    res.send({ error: "The requested pesterlog cannot be edited." });
  } else if (page.password === SHA256(req.body.password + page.salt)) {
    res.send({ authToken: req.body.password });
  } else {
    res.send({ error: "Could not log into pesterlog." });
  }
});

// POST /edit : Edit already made page
router.post("/edit", upload.single("panel"), async function (req, res, next) {
  console.log("EDIT", req.body);
  const page = Page.findOneAndUpdate(
    { id: req.body.id },
    {
      title: req.body.title,
      log: req.body.lines,
      links: req.body.links != null ? req.body.links : "[]",
      panel: { uri: req.file.filename, kind: req.file.mimetype },
    }
  );
  if (!page) {
    res.send({ error: "Could not edit file!" });
  } else {
    res.send({ id: req.body.id });
  }
});

// GET /view/:id : View a page from the database
router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let page = await Page.findOne({ id }).exec();
  if (!page) {
    res.send({ error: "Page not found" });
  } else {
    // couple links with titles before sending away
    let links = [];
    console.log("Found page?", page);
    for (let link of JSON.parse(page._doc.links)) {
      let found = await Page.findOne({ id: link }).exec();
      links.push(found ? { id: link, title: found._doc.title } : { id: link, title: `==> ? (${link})` });
    }
    res.send({ ...page._doc, links: links, password: undefined, _id: undefined, __v: undefined });
  }
});

// GET /list/:page : List pages
router.get("/list/:page", async function (req, res, next) {
  let page = req.params.page;
  let limit = 15;
  Page.find()
    .select("id title")
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ name: "asc" })
    .exec((err, logs) => {
      Page.count().exec((err, count) => {
        let editedLogs = logs.map((log) => {
          return { id: log.id, title: log.title };
        });
        res.send({ page: page, count: Math.ceil(count / limit), logs: editedLogs });
      });
    });
});

module.exports = router;
