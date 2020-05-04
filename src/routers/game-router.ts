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


GameRouter.get('/next', async (req, res) => {
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



GameRouter.post('/group', async (req, res) => {
    try {
        let passport = req.body.passport;
        let groupname = req.body.groupname;
        let event = await passportService.checkIfInGroup(passport, groupname);
        res.json(event);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.post('/nextpassport', async (req, res) => {
    try {
        let name = req.body.name;
        let event = await passportService.getNextPassport();
        res.json(event);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});