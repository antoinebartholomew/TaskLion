// *** Dependencies =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", "views");
app.set("view engine", "jade");

app.use(express.static("public"));
app.use(express.static("nodules/bootstrap/dist"));




// Set Handlebars  (May be valid. Would like to use Handlebars)
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("views", "views")
// app.set("view engine", "jade");


// Routes ====================================================================================================

var taskrs = require("./routes/taskrs-api-routes.js")
var taskees = require("./routes/taskees-api-routes.js");
var htmlRoutes = require("./routes/html-routes.js")
app.use(taskrs);
app.use(taskees);
app.use(htmlRoutes);

// require("./routes/taskrs-api-routes.js")(app);
// require("./routes/taskees-api-routes.js")(app);
// require("./routes/html-routes.js")(app);


// Initialize the Express app =====================================================================================================

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
