import { User } from "../models/user";
import { UserRepository } from "../repos/user-repo";
// import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from "../util/validator";
import {
    BadRequestError,
    ResourceNotFoundError,
    NotImplementedError,
    ResourcePersistenceError,
    AuthenticationError
} from "../errors/errors";
import {
    ValidId,
    isEmptyObject
} from "../util/tools"
import { isString } from "util";


export class UserService {
    constructor(private userRepo: UserRepository) {
        this.userRepo = userRepo;
    }
    async getByUsername(username: string): Promise<User> {
        if (typeof username !== 'string') {
            throw new BadRequestError();
        }
        let user = await this.userRepo.getByUsername(username);
        if (isEmptyObject(user)) {
            throw new ResourceNotFoundError();
        }
        return this.removePassword(user);

    }
    async authenticateUser(username: string, password: string): Promise<User> {
        try {
            if (!isString(username) || !isString(password)) {
                throw new BadRequestError();
            }
            let authUser: User;
            authUser = await this.userRepo.checkCredentials(username, password);
            if (isEmptyObject(authUser)) {
                throw new AuthenticationError();
            }
            this.removePassword(authUser);
            return this.removePassword(authUser);
        } catch (e) {
            throw e;
        }
    }
    addNewUser(newUser: User): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            let conflict = this.getByUsername(newUser.username);

            if (conflict) {
                reject(new ResourcePersistenceError('The provided username is already taken.'));
                return;
            }
            try {
                const persistedUser = await this.userRepo.save(newUser);
                resolve(this.removePassword(persistedUser));
            } catch (e) {
                reject(e);
            }

        });

    }
    private removePassword(user: User): User {
        if (!user || !user.userpassword) return user;
        let usr = { ...user };
        delete usr.userpassword;
        return usr;
    }

}