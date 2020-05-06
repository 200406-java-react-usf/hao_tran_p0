import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

const userService = AppConfig.userService;

AuthRouter.post('', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        let authUser = await userService.authenticateUser(username, password);

        let payload = new Principal(authUser.id, authUser.username, authUser.score, authUser.userrole);
        req.session.principal = payload;
        let profile = { "username": authUser.username, "score": authUser.score };
        res.render('pages/profile', { profile, error: null });

    } catch (e) {
        res.send("unsucessful login")
    }

});

