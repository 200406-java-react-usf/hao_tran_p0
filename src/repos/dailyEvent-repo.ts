import { CrudRepository } from "./crud-repo";
import { DailyEvent } from "../models/dailyEvent";
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapEventResultSet } from "../util/result-set-mapper"
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
    isEmptyObject
} from "../util/tools"
import { Passport } from "../models/passport";

export class DailyEventRepository implements CrudRepository<DailyEvent> {
    async getAll(): Promise<DailyEvent[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM dailyevents";
            let rs = await client.query(sql);
            return rs.rows.map(mapEventResultSet);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async listUnselected(): Promise<DailyEvent[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM dailyevents WHERE selected = false";
            let rs = await client.query(sql);
            return rs.rows.map(mapEventResultSet);
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
            return mapEventResultSet(rs.rows[0]);
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