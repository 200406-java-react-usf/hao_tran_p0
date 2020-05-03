
import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
// import { isEmptyObject } from '../util/validator';
import { ParsedUrlQuery } from 'querystring';
import { admin } from '../middleware/auth-middleware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('/', async (req, res) => {
    console.log("test");
    res.send("user router");
});

UserRouter.get('/:username', async (req, res) => {

    const username = req.body.username;
    console.log("username "+username);
    try {
        let payload = await userService.getByUsername(username);
        res.render('pages/profile/profile', {payload, error: null });
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let newUser = await userService.addNewUser(req.body);
        res.redirect("/:username");
    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});