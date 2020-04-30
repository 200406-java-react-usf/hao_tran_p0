// Dependencies
import express from 'express';
import path from 'path';


// Express App
const app = express();
const PORT = process.env.PORT || 8080;

//routers
// import { UserRouter } from './routers/user-router';
// import { AuthRouter } from './routers/auth-router';
// import { PassportRouter } from './routers/passort-router';
// import { EventRouter } from './routers/event-router';
// import { sessionMiddleware } from './middleware/session-middleware';
// import { corsFilter } from './middleware/cors-filter';

// app.use('/users', UserRouter);
// app.use('/passports', PassportRouter);
// app.use('/events', EventRouter);
// app.use('/auth', AuthRouter);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//

app.use(express.static(path.join(__dirname, 'views')));


//connect db

// import { Client } from 'ts-postgres';
// async function main() {
//   const db = new Client();
//   await db.connect();
// }

// main()
//set ejs template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//to routing page
app.get('/', function(req, res) {
	res.render('pages/index-test');
});

//server setup
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});



