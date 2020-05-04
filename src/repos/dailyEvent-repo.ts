import { CrudRepository } from "./crud-repo";
import { DailyEvent } from "../models/dailyEvent";
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventResult } from "../util/result-mapper"
import {
    BadRequestError,
    ResourceNotFoundError,
    InternalServerError,
    NotImplementedError,
    ResourcePersistenceError,
    AuthenticationError
} from "../errors/errors";
import {
    ValidId,
    isEmptyObject,
    shuffle
} from "../util/tools"

export class DailyEventRepository implements CrudRepository<DailyEvent> {
    async getAll(): Promise<DailyEvent[]> {
        console.log("event repo called");
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            console.log(client);
            let sql = "SELECT * FROM dailyevents";
            let rs = await client.query(sql);
            return  rs.rows.map(mapEventResult);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async getById(id: number): Promise<DailyEvent> {
        if (!ValidId(id)) {
            throw new BadRequestError();
        }
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM dailyevents where id=$1";
            let rs = await client.query(sql, [id]);
            return mapEventResult(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async getUnselected(): Promise<DailyEvent[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM dailyevents WHERE selected = false";
            let rs = await client.query(sql);
            return  rs.rows.map(mapEventResult);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async updateSelected(id: number): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "UPDATE dailyEvents SET selected = true WHERE id= $1";
            let rs = await client.query(sql, [id]);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async resetEvent(): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "UPDATE dailyEvents SET selected = false WHERE selected = true";
            let rs = await client.query(sql);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    // async getGroupByID(id): Promise<DailyEvent[]> {
    //     let client: PoolClient;
    //     try {
    //         client = await connectionPool.connect();
    //         let sql = "SELECT * FROM groups WHERE id = $1";
    //         let rs = await client.query(sql, [id]);
    //         return mapGroupResult(rs.rows[0]);
    //     } catch (e) {
    //         throw new InternalServerError();
    //     } finally {
    //         client && client.release();
    //     }
    // }
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