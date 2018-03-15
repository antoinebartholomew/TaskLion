// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var path = require("path");

var router = express.Router();
module.exports = router;


// Routes =============================================================

  // index route for home page
  router.get("/", function(req, res) {
    res.render("../views/homepage.jade");
  });

  // route for signup page
  router.get("/signup", function(req, res) {
    res.render("../views/signup.jade");
  });

  // route for forgot password
  router.get("/forgotpassword", function(req, res) {
    res.render("../views/forgotpassword.jade");
  });

  // route for list of all tasks
  router.get("/tasks", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tasks.html"));
  });

  // route for create task page
  router.get("/create_task", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create_task.html"));
  });

  // route for taskr-manager.html
  router.get("/taskrs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/taskr-manager.html"));
  });

