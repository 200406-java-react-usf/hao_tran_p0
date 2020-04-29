import { CrudRepository } from "./crud-repo";
import { Event } from "../models/event";
import { Group } from "../models/groups";
const db = require('ts-postgres');

export class EventRepository implements CrudRepository<Event> {
    getAll(): Promise<Event[]> {
        return new Promise<Event[]>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }
    getById(id: Number): Promise<Event> {
        return new Promise<Event>((resolve, reject) => {
            
            if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
                reject("BadRequestError");
                return;
            }
            let query: String = "SELECT id FROM events WHERE id = $id";
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
            let query: String = "SELECT selected FROM events WHERE selected = false";
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
    updateSelected(id: Number): Promise<Event[]> {
        return new Promise<Event[]>((resolve, reject) => {
            let query: String = "UPDATE events SET selected = true WHERE id= $id;";
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
    save(newEvent: Event): Promise<Event> {
        return new Promise<Event>((resolve, reject) => {
            reject("new NotImplementedError()");
        });
    }

    update(updatedEvent: Event): Promise<boolean> {
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