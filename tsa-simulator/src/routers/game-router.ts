import express from 'express';
import AppConfig from "../config/app";


export const GameRouter = express.Router();

const eventService = AppConfig.eventService;
const passportService = AppConfig.passportService;


GameRouter.get('/all', async (req, res) => {
    try {
        console.log("game router called");
        let nextEvent = await passportService.getAll();
        res.send(nextEvent);
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});

GameRouter.get('/game', async (req, res) => {
    try {
        console.log("game router called");
        res.render('pages/profile/profile');
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.get('/eventlist', async (req, res) => {
    try {
        console.log("game router eventlist called");
        let eventlist = await eventService.getUnselectedEventList();
        res.json(eventlist);
        res.render('pages/profile/profile', {payload, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

GameRouter.get('/nextevent', async (req, res) => {
    try {
        console.log("game router nextevent called");
        let eventlist = await eventService.getUnselectedEventList();
        res.json(eventlist);
        res.render('pages/profile/profile', {payload, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});