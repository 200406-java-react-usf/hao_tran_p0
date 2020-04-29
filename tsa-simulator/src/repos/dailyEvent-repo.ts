import { CrudRepository } from "./crud-repo";
import { DailyEvent } from "../models/dailyEvent";
const db = require('ts-postgres');

export class DailyEventRepository implements CrudRepository<DailyEvent> {
    getAll(): Promise<DailyEvent[]> {
        return new Promise<DailyEvent[]>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(id: Number): Promise<DailyEvent> {
        return new Promise<DailyEvent>((resolve, reject) => {
            
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
    getUnselected(): Promise<[Number]> {
        return new Promise<[Number]>((resolve, reject) => {
            let query: String = "SELECT selected FROM dailyEvents WHERE selected = false";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                //return an arr of id
                let arr:[Number];
                results.forEach(element => {
                    arr.push(element.id);
                });
                resolve(arr);
            });
        });
    }
    updateSelected(id: Number): Promise<DailyEvent[]> {
        return new Promise<DailyEvent[]>((resolve, reject) => {
            let query: String = "UPDATE dailyEvents SET selected = true WHERE id= $id;";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
    save(newEvent: DailyEvent): Promise<DailyEvent> {
        return new Promise<DailyEvent>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedEvent: DailyEvent): Promise<boolean> {
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