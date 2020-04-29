
import { CrudRepository } from "./crud-repo";
import { User } from "../models/user";
const pg = require('pg');

export class UserRepository implements CrudRepository<User> {
    getAll(req: any, res: any): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getByUsername(username: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let query: String = "SELECT username FROM users WHERE username = $username";
            let value: String = username;
            if (typeof username !== 'string') {
                reject("BadRequestError");
                return;
            }
            pg.query(query, value, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
    save(newUser: any): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            let query: String = "INSERT INTO users VALUES newUser";
            pg.query(query, newUser, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });

        });
    }
    checkCredentials(username: string, password: string) {
        return new Promise<User>((resolve, reject) => {
            let query: String = "SELECT username FROM users WHERE username = $username";
            let value: String = username;
            if (typeof username !== 'string') {
                reject("BadRequestError");
                return;
            }
            pg.query(query, value, (error, results) => {
                if (error) {
                    reject(error);
                }else if(results.username === username && results.password === password){
                    reject(error);
                }
                resolve(results);
            });

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