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
    isEmptyObject
} from "../util/tools"
import { Passport } from "../models/passport";
import { isString } from "util";


export class PassportService {
    constructor(private passportRepo: PassportRepository) {
        this.passportRepo = passportRepo;
    }
    async getAll(): Promise<Passport[]> {
        let userlist: Passport[] = await this.passportRepo.getAll();
        return userlist;
    }
    async getNextPassport(): Promise<Passport> {
        let userlist: Passport[] = await this.passportRepo.getUnselected();
        if (isEmptyObject(userlist) || !userlist) {
            throw new ResourceNotFoundError();
        }
        let nextPassportId: Passport = userlist[Math.floor(Math.random() * userlist.length)];
        let nextPassport: Passport = { ...await this.passportRepo.getById(nextPassportId.id) };
        if (isEmptyObject(nextPassport) || !nextPassport) {
            throw new ResourceNotFoundError();
        }
        //mark the passport as selected
        await this.passportRepo.updateSelected(nextPassportId.id);
        return nextPassport;
    }
    async getExclusionGrouplist(name: string): Promise<number[]> {
        let passport: Passport[] = await this.passportRepo.getPassportInGroup(name);
        if (passport) {
            let passportList: number[] = [];
            for (let i = 0; i < passport.length; i++) {
                passportList.push(passport[i].id);
            }
            return passportList;
        } else {
            throw new ResourceNotFoundError();
        }
    }
    async checkIfInGroup(passport: Passport, name: string): Promise<Boolean> {
        let idList: number[] = await this.getExclusionGrouplist(name);
        if (isEmptyObject(idList) || !idList) {
            throw new ResourceNotFoundError();
        }
        let result: Boolean = idList.includes(passport.id);
        return result;
    }
    async resetPassportList(): Promise<boolean> {
        let taskCheck: boolean = await this.passportRepo.resetPassport();
        if (taskCheck) {
            return taskCheck;
        } else {
            throw new ResourcePersistenceError();
        }
    }
}
