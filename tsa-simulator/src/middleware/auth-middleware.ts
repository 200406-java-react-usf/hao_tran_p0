
import { Request, Response } from "express";
import { AuthenticationError, AuthorizationError } from "../errors/errors";

export const admin = (req: Request, resp: Response, next) => {
    if (!req.session.principal) {
        resp.sendStatus(401).send(new AuthenticationError("Login Please"));
    } else if (req.session.principal.role === 'Admin') {
        next();
    } else {
        resp.sendStatus(403).send(new AuthorizationError());
    }
}