var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();
module.exports = router;


	router.get("/api/tasks/:id", function(req, res) {
    console.log("1111111" , req);
    console.log("2222222" , res);

    db.Task.findAll({
      where: {
        TaskrId: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
      console.log("For Test" , dbTask);
    });
  });