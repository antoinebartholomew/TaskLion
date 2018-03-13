// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var path = require("path");

var router = express.Router();

// Routes =============================================================
module.exports = function(app) {

  // index route for home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // route for list of all tasks
  app.get("/tasks", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/tasks.html"));
  });

  // route for create task page
  app.get("/create_task", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/create_task.html"));
  });

  // route for taskr-manager.html
  app.get("/taskrs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/taskr-manager.html"));
  });

};
