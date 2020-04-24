// Dependencies
var express = require("express");
//var path = require("path");
//var bodyParser = require("body-parser");


// Express App
var app = express();
var PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require("./app/routing/apiRoutes.js")(app);
require("./app/route/htmlRoutes.ts")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});