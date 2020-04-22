// Dependencies
import express from "express";
//import path from "path";
//import bodyParser from "body-parser";
import pg from  "pg"
//controllers


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
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
