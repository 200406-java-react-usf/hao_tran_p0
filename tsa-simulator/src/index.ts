import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from "body-parser";

import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';
import { Pool } from 'pg';

import { UserRouter } from "./routers/user-router"
import { AuthRouter } from './routers/auth-router';
import { GameRouter } from './routers/game-router';


// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
  host: process.env['DB_HOST'],
  port: +process.env['DB_PORT'],
  database: process.env['DB_NAME'],
  user: process.env['DB_USERNAME'],
  password: process.env['DB_PASSWORD'],
  max: 5
});

// Express App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionMiddleware);
app.use(corsFilter);
app.use('/', express.json());

app.use('/user', UserRouter);
// app.use('/passports', PassportRouter);
app.use('/game', GameRouter);
app.use('/auth', AuthRouter);
const PORT = process.env.PORT || 8080;





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
app.get('/', function (req, res) {
  res.render('pages/index');
});

//server setup
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});



