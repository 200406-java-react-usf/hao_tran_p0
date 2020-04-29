
import url from 'url';
import express from 'express';
import AppConfig from '../config/app';
// import { isEmptyObject } from '../util/validator';
import { ParsedUrlQuery } from 'querystring';
import { admin } from '../middleware/auth-middleware';

export const UserRouter = express.Router();

const userService = AppConfig.userService;

UserRouter.get('/:username', async (req, resp) => {
    const username = req.body.username;
    try {
        let payload = await userService.getByUsername(username);
        return resp.status(200).json(payload);
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }
});

UserRouter.post('', async (req, resp) => {

    console.log('POST REQUEST RECEIVED AT /users');
    console.log(req.body);
    try {
        let newUser = await userService.addNewUser(req.body);
        return resp.status(201).json(newUser).send();
    } catch (e) {
        return resp.status(e.statusCode).json(e).send();
    }

});