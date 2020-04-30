import express from 'express';
import AppConfig from "../config/app";


export const EventRouter = express.Router();

const eventService = AppConfig.eventService;

EventRouter.get('', async (req, res) => {
    try {
        let nextevent = await eventService.getNextEvent();
        res.render('index', {profile: nextevent, error: null});
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});