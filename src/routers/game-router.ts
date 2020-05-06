import express from 'express';
import AppConfig from '../config/app';


export const GameRouter = express.Router();

const eventService = AppConfig.eventService;
const passportService = AppConfig.passportService;

// render main page
GameRouter.get('', async (req, res) => {
    try {
        res.render('pages/game');
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

//for testing, not implemented in game
GameRouter.get('/all', async (req, res) => {
    try {
        let allEvent = await eventService.getEvents();
        res.send(allEvent);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});

//load next event, random
GameRouter.get('/nextevent', async (req, res) => {
    try {
        let event = await eventService.getNextEvent();
        res.send(event);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});

//for testing, not in game, get all events
GameRouter.get('/eventlist', async (req, res) => {
    try {
        let eventlist = await eventService.getEvents();
        res.json(eventlist);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});


//check if id is in grp
GameRouter.post('/groupcheck', async (req, res) => {
    try {
        let passportId = req.body.passportId;
        let groupname = req.body.groupname;
        let answer = await passportService.checkIfInGroup(passportId, groupname);
        res.json(answer);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

//get next random passport
GameRouter.get('/nextpassport', async (req, res) => {
    try {
        let passport = await passportService.getNextPassport();
        res.json(passport);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

// reset all game db to default
GameRouter.get('/resetgame', async (req, res) => {
    try {
        await passportService.resetPassportList();
        await eventService.resetEventList();
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
    res.send('resetting');
});