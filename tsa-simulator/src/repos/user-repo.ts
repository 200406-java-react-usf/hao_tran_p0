
import { CrudRepository } from "./crud-repo";
import { User } from "../models/user";
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapUserResult } from "../util/result-mapper"
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
    isEmptyObject,
    shuffle
} from "../util/tools"

export class UserRepository implements CrudRepository<User> {
    baseQuery = `select id, username, score from users`;
    async getAll(): Promise<User[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery}`;
            let rs = await client.query(sql);
            return  rs.rows.map(mapUserResult);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }
    getById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
                reject("new NotImplementedError()");
            });
    }
    async getByUsername(username: string): Promise<User> {
        if(!isStrings(name)){
            throw new BadRequestError();
        }
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where username = $1`;
            let rs = await client.query(sql, [username]);
            return mapUserResult(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async save(newUser:User): Promise<User> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `insert into app_users (username, userpassword, score, userrole) 
            values ($1, $2, $3, $4) returning id`;
            let rs = await client.query(sql, [newUser.username, newUser.userpassword, 0, "tester"]);
            return newUser;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async checkCredentials(username: string, password: string) {
        console.log("checkCredentials method called");
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where username = $1 and userpassword = $2`;
            let rs = await client.query(sql, [username, password]);
            return mapUserResult(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
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