
import { CrudRepository } from "./crud-repo";
import { Passport } from "../models/passport";
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapPassportResultSet } from "../util/result-set-mapper"
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
    isStrings,
    isEmptyObject
} from "../util/tools"

export class PassportRepository implements CrudRepository<Passport> {
    async getAll(): Promise<Passport[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM passports";
            let rs = await client.query(sql);
            return  rs.rows.map(mapPassportResultSet);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }

    }
    async getById(id: number): Promise<Passport> {
        let client: PoolClient;
        if (!ValidId(id)) {
            throw new BadRequestError();
        }
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM passports where id=$1";
            let rs = await client.query(sql, [id]);
            return mapPassportResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async getUnselected(): Promise<Passport[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM passports where selected = false";
            let rs = await client.query(sql);
            return  rs.rows.map(mapPassportResultSet);
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
            let sql = "UPDATE passports SET selected = true WHERE id=$1";
            let rs = await client.query(sql, [id]);
            return true
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async resetPassport(): Promise<boolean> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "UPDATE passports SET selected = $1 WHERE selected = $2";
            await client.query(sql, [false, true]);
            return true
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async getPassportInGroup(name: string): Promise<Passport[]> {
        if(!isStrings(name)){
            throw new BadRequestError();
        }
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = "SELECT * FROM "+ name;
            let rs = await client.query(sql);
            return  rs.rows.map(mapPassportResultSet);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
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