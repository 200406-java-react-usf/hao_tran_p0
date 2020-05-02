import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

const userService = AppConfig.userService;

AuthRouter.post('', async (req, res) => {
    try {
        const { username, password } = req.body;
        let authUser = await userService.authenticateUser(username, password);
        let payload = new Principal(authUser.id, authUser.username, authUser.userrole);
        req.session.principal = payload;
        res.redirect("/:username");   
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});
