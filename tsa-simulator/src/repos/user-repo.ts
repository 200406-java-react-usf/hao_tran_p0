
import { CrudRepository } from "./crud-repo";
import { User } from "../model/user";
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
            let username = newUser.username;
            let queryCheck: String = "SELECT id FROM user WHERE login= $username";
            let queryNew: String = "INSERT INTO users VALUES newUser";
            async function registerNewUser() {
                let promise: Promise<[User]> = new Promise((resolve, reject) => {
                    let [dup]: [Array<User>] =
                        pg.query(queryCheck, username, (error, [results]: [Array<User>]) => {
                            if (error) {
                                reject(error);
                            }
                            return results;
                        });
                    return dup;
                });
                let dup = await promise;
                if (dup.length > 0){
                    reject("username error");
                }else{
                    pg.query(queryNew, newUser, (error, results) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    });
                }
            }
            registerNewUser();
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