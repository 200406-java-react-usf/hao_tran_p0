// Dependencies
const express = require("express");
const path = require('path')
//var path = require("path");
//var bodyParser = require("body-parser");


// Express App
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


//to routing page
require("./route/htmlRoutes.ts")(app);

//server setup
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


