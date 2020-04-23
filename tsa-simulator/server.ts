// Dependencies
const express = require("express");
//import path from "path";
//import bodyParser from "body-parser";
const pg = require("pg");
//controllers

//models
// require('./data/models/User');
// require('./data/models/Article');
// require('./data/models/Comment');
// //
// require('./config/passport');

// //connect to db
// const connection = pg.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "test",
//   database: "tsaGame"
// });

// connection.connect("address",
//   { useNewUrlParser: true },
//   { useUnifiedTopology: true });

// Express App
const app = express();
const PORT = process.env.PORT || 8080;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// require("./app/routing/apiRoutes.js")(app);
// require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
