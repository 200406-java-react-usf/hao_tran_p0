
import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';
// import { isEmptyObject } from '../util/validator';
import { ParsedUrlQuery } from 'querystring';
import { admin } from '../middleware/auth-middleware';
import { User } from '../models/user';

export const UserRouter = express.Router();

const userService = AppConfig.userService;
// for testing connection
UserRouter.get('/', admin, async (req, res) => {
    res.send('user router');
});

UserRouter.get('/:username', async (req, res) => {
    const username = req.body.username;
    try {
        let payload = await userService.getByUsername(username);
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('/register', async (req, res) => {
    try {
        let newUser = await userService.addNewUser(req.body.username, req.body.password);
        let payload = new Principal(newUser.id, newUser.username, newUser.score, newUser.userrole);
        req.session.principal = payload;
        let profile = { 'username': newUser.username, 'score': newUser.score };
        res.render('pages/profile', { profile, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});
// for testing 
UserRouter.post('/profile', async (req, res) => {
    console.log('session ' + req.session.principal);
    try {
        let profile = { 'username': req.session.principal.username, 'score': req.session.principal.score };
        res.render('pages/profile', { profile, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('/asset', async (req, res) => {
    console.log("hit asset");

    let username = req.body.username;
    let score = req.body.score;

    console.log('asset body '+username+ "  "+ score);
    try {
        let user: User = await userService.getByUsername(username);
        let userId: number = user.id;
        console.log('update '+userId+ "  "+ score);
        await userService.updateScore(userId, score);

    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});