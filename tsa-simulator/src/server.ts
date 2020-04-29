// Dependencies
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import pg from 'pg';

// Express App
const app = express();
const PORT = process.env.PORT || 8080;

//routers
import { UserRouter } from './routers/user-router';
import { AuthRouter } from './routers/auth-router';
import { PassportRouter } from './routers/passort-router';
import { EventRouter } from './routers/event-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';

app.use('/users', UserRouter);
app.use('/passports', PassportRouter);
app.use('/events', PassportRouter);
app.use('/auth', AuthRouter);

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


