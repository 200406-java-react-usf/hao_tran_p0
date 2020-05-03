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