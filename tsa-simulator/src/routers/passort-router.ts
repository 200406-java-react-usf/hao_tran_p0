import express from 'express';
import AppConfig from "../config/app";


export const PassportRouter = express.Router();

const passportService = AppConfig.passportService;

PassportRouter.get('', async (req, res) => {
    try {
        let nextPassport = await passportService.getNextPassport();
        res.render('index', {nextPassport: nextPassport, error: null});
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});