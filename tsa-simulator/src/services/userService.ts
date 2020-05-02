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


export class UserService {
    constructor(private userRepo: UserRepository) {
        this.userRepo = userRepo;
    }
    getByUsername(username: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            if (typeof username !== 'string') {
                reject("BadRequestError");
                return;
            }
            let user = {...await this.userRepo.getByUsername(username)};
            // if (isEmptyObject(user)) {
            //     return reject(new ResourceNotFoundError());
            // }
            resolve(user);
        });
    }
    authenticateUser(un: string, pw: string): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {
            // if (!isValidStrings(un, pw)) {
            //     reject(new BadRequestError());
            //     return;
            // }
            let authUser: User;
            try {
                authUser = await this.userRepo.checkCredentials(un, pw);
            } catch (e) {
                reject(e);
            }
            // if (isEmptyObject(authUser)) {
            //     reject(new AuthenticationError('Bad credentials provided.'));
            //     return;
            // }
            resolve(this.removePassword(authUser));

        });

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
        if(!user || !user.userpassword) return user;
        let usr = {...user};
        delete usr.userpassword;
        return usr;   
    }

}