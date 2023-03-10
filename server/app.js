// Import Express
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mime = require("mime-types");

// Import routers
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

// Init db
var { connect } = require("./controllers");
connect();

var app = express();

// FIXME temporary CORS
app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  });
  next();
});

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err.message === "Not Found") {
    res.redirect("/404");
  } else {
    res.status(err.status || 500);
    res.send({ error: `${err.message} ${res.locals.error}` });
  }
});

module.exports = app;
