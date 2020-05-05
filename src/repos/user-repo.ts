
import { CrudRepository } from "./crud-repo";
import { User } from "../models/user";
import { PoolClient } from 'pg';
import { connectionPool } from '..';
import { mapUserResultSet } from "../util/result-set-mapper"
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

export class UserRepository implements CrudRepository<User> {

    baseQuery = `select id, username, score from users`;

    async getAll(): Promise<User[]> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery}`;
            let rs = await client.query(sql);
            return  rs.rows.map(mapUserResultSet);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }
    async getById(id: number): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            reject(new NotImplementedError());
        });
    }
    async getByUsername(username: string): Promise<User> {
        let client: PoolClient;
        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where username = $1`;
            let rs = await client.query(sql, [username]);
            return mapUserResultSet(rs.rows[0]);
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
            let sql = `insert into users (username, userpassword, score, userrole) 
            values ($1, $2, $3, $4) returning id`;
            let rs = await client.query(sql, [newUser.username, newUser.userpassword, 0, "tester"]);
            newUser.id = rs.rows[0].id;
            return newUser;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    async checkCredentials(username: string, password: string) {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `${this.baseQuery} where username = $1 and userpassword = $2`;
            let rs = await client.query(sql, [username, password]);
            return mapUserResultSet(rs.rows[0]);
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    
    }
    async updateScore(userId: number, score: number): Promise<boolean> {
        let client: PoolClient;

        try {
            client = await connectionPool.connect();
            let sql = `UPDATE users where id = $1 set score = $2`;
            let rs = await client.query(sql, [userId, score]);
            return true;
        } catch (e) {
            throw new InternalServerError();
        } finally {
            client && client.release();
        }
    }
    update(updatedUser: User): Promise<boolean> {
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