import { User } from "../models/user";
import { UserRepository } from "../repos/user-repo";
import {
    ValidId, isStrings,
    isValidObject,
    isEmptyObject
} from "../util/tools";
import {
    BadRequestError,
    ResourceNotFoundError,
    NotImplementedError,
    ResourcePersistenceError,
    AuthenticationError
} from "../errors/errors";

export class UserService {
    constructor(private userRepo: UserRepository) {
        this.userRepo = userRepo;
    }
    async getByUsername(username: string): Promise<User> {

        let user = await this.userRepo.getByUsername(username);
        if (isEmptyObject(user) || !user) {
            throw new ResourceNotFoundError();
        } else {
            return this.removePassword(user);
        }

    };
    //log in
    async authenticateUser(username: string, password: string): Promise<User> {
        try {

            let authUser: User;
            authUser = await this.userRepo.checkCredentials(username, password);
            if (isEmptyObject(authUser)) {
                throw new AuthenticationError();
            } else {
                this.removePassword(authUser);
                return this.removePassword(authUser);
            }

        } catch (e) {
            throw e;
        }
    };
    // register new user
    async addNewUser(username: string, password: string): Promise<User> {
        try {
            let newUser = new User(0, username, password, 0, "User")
            const persistedUser = await this.userRepo.save(newUser);
            return this.removePassword(persistedUser);
        } catch (e) {
            throw new BadRequestError();
        }
    };
    // only update score
    async updateScore(userId: number, score: number): Promise<boolean> {
        try {
            await this.userRepo.updateScore(userId, score);
            return true;
        } catch (e) {
            throw new BadRequestError();
        }
    };
    //private method to remove password from user
    private removePassword(user: User): User {
        if (!user || !user.userpassword) return user;
        let usr = { ...user };
        delete usr.userpassword;
        return usr;
    }

}