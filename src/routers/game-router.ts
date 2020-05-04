import express from 'express';
import AppConfig from "../config/app";


export const GameRouter = express.Router();

const eventService = AppConfig.eventService;
const passportService = AppConfig.passportService;


GameRouter.get('/', async (req, res) => {
    try {
        console.log("game router called");
        res.render('pages/game');
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.get('/all', async (req, res) => {
    try {
        console.log("game router called");
        let allEvent = await eventService.getEvents();
        res.send(allEvent);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});


GameRouter.get('/nextevent', async (req, res) => {
    try {
        console.log("game router next event called");
        let event = await eventService.getNextEvent();
        res.send(event);
    } catch (e) {
        return res.status(e.statusCode || 500).json(e).send();
    }
});


GameRouter.get('/eventlist', async (req, res) => {
    try {
        console.log("game router eventlist called");
        let eventlist = await eventService.getEvents();
        res.json(eventlist);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});



GameRouter.post('/group', async (req, res) => {
    try {
        let passport = req.body.passport;
        let groupname = req.body.groupname;
        console.log("game router group called");
        let event = await passportService.checkIfInGroup(passport, groupname);
        res.json(event);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.post('/nextpassport', async (req, res) => {
    try {
        let name = req.body.name;
        console.log("game router nextevent called");
        let event = await passportService.getNextPassport();
        res.json(event);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});