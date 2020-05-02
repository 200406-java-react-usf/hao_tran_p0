import express from 'express';
import AppConfig from "../config/app";


export const EventRouter = express.Router();

const eventService = AppConfig.eventService;

EventRouter.get('', async (req, res) => {
    try {
        let Eventid = req.body.Eventid;
        let nextEvent = await eventService.getNextEvent(Eventid);
        res.render('index', {nextEvent: nextEvent, error: null});
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});