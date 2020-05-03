import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

const userService = AppConfig.userService;

AuthRouter.post('', async (req, res) => {
    console.log("in auth");
    try {
        const username = req.body.username;
        const password = req.body.password;
        console.log(req.body);
        
        let authUser = await userService.authenticateUser(username, password);
        let payload = new Principal(authUser.id, authUser.username, authUser.score, authUser.userrole);
        req.session.principal = payload;
        res.status(200).json(payload);
        // res.redirect("/:username");   
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});

AuthRouter.get('/test', async (req, res) => {
    console.log("test auth");
    res.send("auth testing router");
});
