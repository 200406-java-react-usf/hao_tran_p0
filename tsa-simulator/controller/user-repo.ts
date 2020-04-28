
import { CrudRepository } from "./crud-repo";
import { User } from "../model/user";
const pg = require('pg');

export class UserRepository implements CrudRepository<User> {
    getAll(req: any, res: any): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(req: any, res: any): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let username:String = req.body.username;
            let query:String = "SELECT * FROM users WHERE username = $username";
            let value:String = username;
            if (typeof username !== 'string') {
                reject("BadRequestError");
                return;
            }
            pg.query(query, value, (error, results) => {
              if (error) {
                reject(error);
              }
              res.body.user = results;
            })
            resolve(res);
        })
    }
    save(newUser: User): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedUser: User): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject("NotImplementedError()");
        });
    }
}