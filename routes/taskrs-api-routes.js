// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();

//Routes =================================================================================================
// Example
// router.get("/", function(req, res){
//     res.send("homepage")
// })

module.exports = function(app) {

// Find all Taskrs and return them to the user with res.json
app.get("/api/taskrs", function(req, res) {
  db.Taskr.findAll({}).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});

app.get("/api/taskrs/:id", function(req, res) {
  // Find one Taskr with the id in req.params.id and return them to the user with res.json
  db.Taskr.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});

app.post("/api/taskrs", function(req, res) {
  // Create an Taskr with the data available to us in req.body
  console.log(req.body);
  db.Taskr.create(req.body).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});

app.delete("/api/taskrs/:id", function(req, res) {
  // Delete the Taskr with the id available to us in req.params.id
  db.Taskr.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});
};
