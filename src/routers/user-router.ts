
import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';
// import { isEmptyObject } from '../util/validator';
import { ParsedUrlQuery } from 'querystring';
import { admin } from '../middleware/auth-middleware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('/', admin, async (req, res) => {
    console.log("test");
    res.send("user router");
});

UserRouter.get('/:username', async (req, res) => {

    const username = req.body.username;
    console.log("username "+username);
    try {
        let payload = await userService.getByUsername(username);
        res.render('pages/profile', {payload, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('/register', async (req, res) => {
    console.log("register body "+req.body);
    try {
        let newUser = await userService.addNewUser(req.body.username, req.body.password);
        let payload = new Principal(newUser.id, newUser.username, newUser.score, newUser.userrole);
        req.session.principal = payload;
        let profile = { "username": newUser.username, "score": newUser.score };
        res.render('pages/profile', { profile, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('/asset', async (req, res) => {
    console.log("asset body "+req.body);
    try {
        let newscore: number = req.session.principal.score + req.body.delta;
        let userId: number = req.session.principal.id;
                
        await userService.updateScore(userId, newscore);

    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});