import url from 'url';
const express = require("express");
import { UserRepository } from "../controller/user-repo";
export const UserRoutes = express.Router();


UserRoutes.get("/auth", async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let payload = await UserRepository.prototype.getByUsername(username);
        if(payload.password == password){
            res.send(200, {"result": true})
        }else{
            res.send(200, {"result": false})
        }


    } catch (e) {
        return res.status(e.statusCode).json(e).send();
    }
});

