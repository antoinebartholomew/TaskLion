// Dependencies =============================================================
var express = require("express");
var _ = require("lodash");
var db = require("../models");

var router = express.Router();
module.exports = router;

// Task routes ========================================================
  // GET route for getting all of the tasks
  router.get("/api/tasks/", function(req, res) {
    db.Task.findAll({})
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // GET route for returning tasks of a specific category
  router.get("/api/tasks/category/:category", function(req, res) {
    db.Task.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });


  // GET rotue for retrieving a single task
  router.get("/api/tasks/:id", function(req, res) {
    db.Task.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // POST route for saving a new task
  router.post("/api/tasks", function(req, res) {
    db.Task.create(req.body)
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // DELETE route for deleting tasks
  router.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });

  // PUT route for updating tasks
  router.put("/api/tasks", function(req, res) {
    db.Task.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbTask) {
        res.json(dbTask);
      });
  });



  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    // GET route for returning tasks of a specific category
  // router.get("/api/tasks/category/:category", function(req, res) {
  //   db.Task.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   })
  //     .then(function(dbTask) {
  //       res.json(dbTask);
  //     });
  // });


  // router.get("api/task/:id", function(req, res) {
  //   if (req.params.id) {
  //     db.Task.findAll({
  //       where: {
  //         id: req.params.id
  //       },
  //     }).then(function(dbTasks) {
  //       res.json(dbTasks);
  //     });
  //   }
  // });
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // $.ajax("/api/tasks/" + sessionStorage.getItem("id"), {
	// 	type: "GET",
	// 	id : sessionStorage.getItem("id")
	// 	}).then(function(dbTaskr) {
	// 		console.log(dbTaskr);
	// 	})


	// GET route for returning tasks of a specific user
	router.get("/api/tasks/:id", function(req, res) {
    console.log("1111111" + req);
    console.log("2222222" + res);
    
    
		db.Task.findAll({
		where: {
			TaskrId: req.params.id
		}
		})
		.then(function(dbTask) {
      res.json(dbTask);
      console.log("For Test" +dbTask);
      
		});
	});


// Executing (default): SELECT `id`, `title`, `price`, `category`, `body`, `dayofWeek`, `taskrAccept`, `requesterAccept`, `taskrMarkComplete`, `requesterMarkComplete`, `createdAt`, `updatedAt`, `TaskrId` FROM `Tasks` AS `Task` WHERE `Task`.`TaskrId` = '3';