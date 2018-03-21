// *** Dependencies =============================================================
var express = require("express");
var multer = require("multer");
var ejs = require("ejs");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

<<<<<<< HEAD
=======
app.set("views", __dirname + "/views");
// app.set("views", "views");
>>>>>>> 2f55d191650bea3dae7aa90afc928f218320b9ee
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static("public"));
app.use(express.static("nodules/bootstrap/dist"));

//for pictures upload
// var pics = require("./fileUpload/fileUpload.js");
// app.use(pics)

// Routes ====================================================================================================

var taskrs = require("./routes/taskrs-api-routes.js");
var test = require("./routes/test-api.js");
var taskees = require("./routes/taskees-api-routes.js");
// var tasks = require("./routes/tasks-api-routes.js");
var htmlRoutes = require("./routes/html-routes.js");
app.use(taskrs);
app.use(test);
// app.use(tasks);
app.use(taskees);

app.use(htmlRoutes);

// Initialize the Express app =====================================================================================================

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
