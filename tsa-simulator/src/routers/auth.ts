import express from 'express';
import AppConfig from '../config/app';
import { Principal } from '../dtos/principal';

export const AuthRouter = express.Router();

const authService = AppConfig.userService;

AuthRouter.post('', async (req, res) => {
    try {
        const { username, password } = req.body;
        let authUser = await authService.authUser(username, password);
        let payload = new Principal(authUser.id, authUser.username, authUser.role);
        req.session.principal = payload;
        res.redirect("../:id");   
    } catch (e) {
        res.status(e.statusCode || 500).json(e);
    }
});
