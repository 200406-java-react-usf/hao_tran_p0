
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
    // not implemented in app, for testing
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

    };
    // will get everything via inner join
    async getById(id: number): Promise<Passport> {
        let client: PoolClient;
        if (!ValidId(id)) {
            throw new BadRequestError();
        }
        try {
            client = await connectionPool.connect();
            let sql = 
            `SELECT 
             passports.id,
             passports.firstname,
             passports.lastname, 
             origins.name as origin, 
             occupations.name as occupation, 
             races.name as race, 
             religions.name as religion, 
             cultures.name as culture, 
             passports.property, 
             passports.selected 
             FROM passports 
             JOIN origins ON 
             passports.origin = origins.id  
             JOIN occupations ON 
             passports.occupation = occupations.id  
             JOIN races ON passports.race = races.id  
             JOIN religions ON passports.religion = religions.id  
             JOIN cultures ON passports.culture = cultures.id 
             where passports.id=$1`;
            let rs = await client.query(sql, [id]);
            return mapPassportResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    //only need the passport id
    async getUnselected(): Promise<Passport[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = 
            `SELECT * from passports where selected = false`;
            let rs = await client.query(sql);
            return  rs.rows.map(mapPassportResultSet);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    //mark loaded passport to selected
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
    // reset all passport to unselected
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
    // get all the passports in a group
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
            reject(new NotImplementedError());
        });
    }

    update(updatedPassport: Passport): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject(new NotImplementedError());
        });
    }

    deleteById(id: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            reject(new NotImplementedError());
        });
    }
}