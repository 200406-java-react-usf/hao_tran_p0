import { User } from "../models/user";
import { PassportRepository } from "../repos/passport-repo";
// import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from "../util/validator";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";
import { Passport } from "../models/passport";


export class PassportService {
    constructor(private passportRepo: PassportRepository) {
        this.passportRepo = passportRepo;
    }
    getNextPassport(): Promise<Passport> {
        return new Promise<Passport>(async (resolve, reject) => {

            let userlist:[Number] = {...await this.passportRepo.getUnselected()};
            let nextPassportId:Number = userlist[Math.floor(Math.random() * userlist.length)];
            let nextPassport: Passport = {...await this.passportRepo.getById(nextPassportId)};
            // if (isEmptyObject(user)) {
            //     return reject(new ResourceNotFoundError());
            // }
            resolve(nextPassport);
        });
    }
    checkEntrance(): Promise<Number> {
        return new Promise<Passport>(async (resolve, reject) => {

            resolve(nextPassport);
        });
    }
}