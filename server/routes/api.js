var express = require("express");
var multer = require("multer");
var path = require("path");
var mime = require("mime-types");
var fs = require("fs");
var SHA256 = require("crypto-js/sha256");
var enc = require("crypto-js/enc-hex");
var router = express.Router();

// Import nanoid
const { nanoid } = require("nanoid");

// Import controllers
const { Page } = require("../controllers/Page");

// Use AWS
var aws = require("aws-sdk");
const spacesEndpoint = new aws.Endpoint("https://nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

// global id generator
let globalId = nanoid(9);
function refreshId() {
  globalId = nanoid(9);
}

// Create multer uploader
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "/../public/static/img/"));
//   },
//   filename: function (req, file, cb) {
//     let filename = `${req.body.id}.${mime.extension(file.mimetype)}`;
//     let filepath = path.join(__dirname, `/../public/static/img/${filename}`);
//     if (fs.existsSync(filepath)) {
//       fs.unlinkSync(filepath);
//     }
//     cb(null, filename);
//   },
// });
var multerS3 = require("multer-s3");
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pestergen",
    acl: "public-read",
    key: function (req, file, cb) {
      let id = req.body.id || globalId;
      //console.log("multer gets", id);
      cb(null, `${id}.${mime.extension(file.mimetype)}`);
    },
  }),
});

// POST /create : Create new page
//   id*      : Unique ID for the page
//   title*   : Title of the page
//   password : Password for editing later
//   salt     : Password salt
//   links    : Array of links
//   log      : Log
//   panel    : Image
router.post("/create", upload.single("panel"), async function (req, res, next) {
  //console.log("REQUEST:", req.body);
  console.log("UPLOAD:", req.file);
  // create page
  let salt = nanoid(21);
  const page = new Page({
    id: req.body.id || globalId,
    title: req.body.title,
    password: req.body.password ? SHA256(req.body.password + salt).toString(enc) : null,
    salt: salt,
    log: req.body.lines,
    links: req.body.links != null ? req.body.links : "[]",
    panel: { uri: req.file.key, kind: req.file.mimetype },
  });
  refreshId();
  await page.save();
  res.send({ id: page.id });
});

// POST /auth : Check that password exists and return token
router.post("/auth", async function (req, res, next) {
  const page = await Page.findOne({ id: req.body.id }).exec();
  //console.log("finding page", req.body, page);
  if (!page) {
    res.send({ error: "Pesterlog could not be found." });
  } else if (!page.password) {
    res.send({ error: "The requested pesterlog cannot be edited." });
  } else if (page.password === SHA256(req.body.password + page.salt).toString(enc)) {
    res.send({ authToken: req.body.password });
  } else {
    //console.log("Reset password:", SHA256(req.body.password + page.salt).toString(enc));
    res.send({ error: "Could not log into pesterlog." });
  }
});

// POST /edit : Edit already made page
router.post("/edit", upload.single("panel"), async function (req, res, next) {
  console.log("EDIT", req.body);
  const page = await Page.findOne({ id: req.body.id }).exec();
  let authed = false;
  // check password
  if (!page) {
    res.send({ error: "Pesterlog could not be found." });
    return;
  } else if (!page.password) {
    res.send({ error: "The requested pesterlog cannot be edited." });
    return;
  } else if (page.password === SHA256(req.body.password + page.salt).toString(enc)) {
    authed = true;
  } else {
    //console.log("Reset password:", SHA256(req.body.password + page.salt).toString(enc));
    res.send({ error: "Could not log into pesterlog." });
    return;
  }
  if (!authed) {
    res.send({ error: "Could not edit file!" });
    return;
  }
  //
  page.title = req.body.title;
  page.log = req.body.lines;
  page.links = req.body.links;
  page.panel = { uri: req.file.key, kind: req.file.mimetype };
  page.save();

  res.send({ id: req.body.id });
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
