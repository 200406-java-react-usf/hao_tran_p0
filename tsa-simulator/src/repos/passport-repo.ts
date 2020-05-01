
import { CrudRepository } from "./crud-repo";
import { Passport } from "../models/passport";
import {
    BadRequestError,
    ResourceNotFoundError,
    NotImplementedError,
    ResourcePersistenceError,
    AuthenticationError
} from "../errors/errors";
import {
    ValidId,
    isEmptyObject,
    shuffle
} from "../util/tools"
const db = require('ts-postgres');


export class PassportRepository implements CrudRepository<Passport> {
    getAll(): Promise<Passport[]> {
        return new Promise<Passport[]>((resolve, reject) => {
            let query: String = "SELECT * FROM passports";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (!results) {
                    reject("new ResourceNotFoundError()");
                    return;
                }
                resolve(results);
            });

        });
    }
    getById(id: number): Promise<Passport> {
        return new Promise<Passport>((resolve, reject) => {
            
            if (!ValidId(id)) {
                return reject(new BadRequestError());
            }
            let query: String = "SELECT id FROM passports WHERE id = $id";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (!results) {
                    return reject(new ResourceNotFoundError());
                }
                resolve(results);
            });
        })
    }
    getUnselected(): Promise<Passport[]> {
        return new Promise<Passport[]>((resolve, reject) => {
            let query: String = "SELECT selected FROM passports WHERE selected = false";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                //return an arr of id
                let arr:Passport[];
                results.forEach(element => {
                    arr.push(element);
                });
                resolve(arr);
            });
        });
    }
    updateSelected(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            let query: String = "UPDATE passports SET selected = true WHERE id= $id;";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
    resetPassport(): Promise<void> {
        return new Promise((resolve, reject) => {
            let query: String = "UPDATE passports SET selected = false WHERE selected = true";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
    save(newPassport: Passport): Promise<Passport> {
        return new Promise<Passport>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedPassport: Passport): Promise<boolean> {
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