import express from 'express';
import AppConfig from "../config/app";


export const GameRouter = express.Router();

const eventService = AppConfig.eventService;
const passportService = AppConfig.passportService;


GameRouter.get('/', async (req, res) => {
    try {
        res.render('pages/game');
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.get('/all', async (req, res) => {
    try {
        let allEvent = await eventService.getEvents();
        res.send(allEvent);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});


GameRouter.get('/nextevent', async (req, res) => {
    try {
        let event = await eventService.getNextEvent();
        res.send(event);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});


GameRouter.get('/eventlist', async (req, res) => {
    try {
        let eventlist = await eventService.getEvents();
        res.json(eventlist);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});



GameRouter.post('/groupcheck', async (req, res) => {
    try {
        let passport = req.body.passport;
        let groupname = req.body.groupname;
        let answer = await passportService.checkIfInGroup(passport, groupname);
        res.json(answer);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.get('/nextpassport', async (req, res) => {
    try {
        let passport = await passportService.getNextPassport();
        res.json(passport);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});