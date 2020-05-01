import { PassportRepository } from "../repos/passport-repo";
import {
    BadRequestError,
    ResourceNotFoundError,
    NotImplementedError,
    ResourcePersistenceError,
    AuthenticationError
} from "../errors/errors";
import {
    ValidId,
    isEmptyObject,
    shuffle
} from "../util/tools"
import { Passport } from "../models/passport";


export class PassportService {
    constructor(private passportRepo: PassportRepository) {
        this.passportRepo = passportRepo;
    }
    getNextPassport(): Promise<Passport> {
        return new Promise<Passport>(async (resolve, reject) => {
            let userlist: Passport[] = await this.passportRepo.getUnselected();
            if (isEmptyObject(userlist)) {
                return reject(new ResourceNotFoundError());
            }
            let nextPassportId: Passport = userlist[Math.floor(Math.random() * userlist.length)];
            let nextPassport: Passport = {...await this.passportRepo.getById(nextPassportId.id)};
            if (isEmptyObject(nextPassport)) {
                return reject(new ResourceNotFoundError());
            }
            //mark the passport as selected
            await this.passportRepo.updateSelected(nextPassportId.id);
            if (isEmptyObject(nextPassport)) {
                return reject(new ResourceNotFoundError());
            }
            resolve(nextPassport);
        });
    }
    resetPassportList(): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            let taskCheck = await this.passportRepo.resetPassport();
            if (taskCheck) {
                resolve();
            } else {
                return reject(new ResourcePersistenceError())
            }
        });
    }
}
