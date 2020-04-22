const express = require("express");
const pg = require("pg");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
const connection = pg.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "tsaGame"
});
// Connect to the Mongo DB
// pg.connect(process.env.MONGODB_URI || "mongodb://localhost/liftnrun",
//   { useNewUrlParser: true },
//   { useUnifiedTopology: true });

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});