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
  console.log("*************API ROUTES*************");  
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




//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   

router.get("api/taskr/task/:id", function(req, res){
    if (req.params.id){
      db.Taskr.findAll({
        where: {
          id: req.params.id
            },
        include: [db.Task]
    }).then(function(dbTaskr) {
      res.json(dbTaskr);
    });
  }
})


//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   



router.post("/api/taskrs", function(req, res) {
  // Create an Taskr with the data available to us in req.body
  console.log("API LINE 59 " +req.body);
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


// PUT route for updating password
router.put("/api/update/password", function(req, res) {
  db.Taskr.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbTask) {
      res.json(dbTask);
    });
});

// PUT route for logging out and update loggedIn to False
router.put("/api/logout", function(req, res) {
      console.log("*************API ROUTES*************");
      console.log(req.body);
      console.log("*************API ROUTES*************");
  db.Taskr.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbTask) {
      res.json(dbTask);
    });
});


// PUT route for logging in and update loggedIn to True
router.put("/api/login", function(req, res) {
    console.log("*************API ROUTES*************");
    console.log(req.body);
    console.log("*************API ROUTES*************");

  db.Taskr.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbTask) {
      res.json(dbTask);
    });
});



	// router.get("/api/tasks/:id", function(req, res) {
  //   console.log("1111111" + req);
  //   console.log("2222222" + res);

  //   db.Task.findAll({
  //     where: {
  //       TaskrId: req.params.id
  //     }
  //   }).then(function(dbTask) {
  //     res.json(dbTask);
  //     console.log("For Test" + dbTask);
  //   });
  // });