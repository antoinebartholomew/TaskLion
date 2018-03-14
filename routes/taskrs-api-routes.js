// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();
module.exports = router;

//Routes =================================================================================================

// Find all Taskrs and return them to the user with res.json
router.get("/api/taskrs", function(req, res) {
  db.Taskr.findAll({}).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});


router.get("/api/taskrs/:username", function(req, res) {
  // Find one Taskr with the id in req.params.id and return them to the user with res.json
  console.log("**************************");
  
  console.log(req.params);
  console.log(req.body);
  
console.log("**************************");
  db.Taskr.findOne({
    where: {
      username: req.params.username
    }
  }).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});

router.post("/api/taskrs", function(req, res) {
  // Create an Taskr with the data available to us in req.body
  console.log(req.body);
  db.Taskr.create(req.body).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});

router.delete("/api/taskrs/:id", function(req, res) {
  // Delete the Taskr with the id available to us in req.params.id
  db.Taskr.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbTaskr) {
    res.json(dbTaskr);
  });
});
