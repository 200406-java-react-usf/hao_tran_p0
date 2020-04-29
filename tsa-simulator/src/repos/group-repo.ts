import { CrudRepository } from "./crud-repo";
import { Group } from "../models/groups";
const db = require('ts-postgres');

export class DailyEventRepository implements CrudRepository<Group> {
    getAll(): Promise<Group[]> {
        return new Promise<Group[]>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(id: Number): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject("BadRequestError");
                return;
            }
            let query: String = "SELECT id FROM dailyEvents WHERE id = $id";
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
        })
    }
    save(newEvent: Group): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    update(updatedEvent: Group): Promise<boolean> {
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