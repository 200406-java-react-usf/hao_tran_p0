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
import { isString } from "util";


export class PassportService {
    constructor(private passportRepo: PassportRepository) {
        this.passportRepo = passportRepo;
    }
    async getAll(): Promise<Passport[]> {
        console.log("passport getall called");
        let userlist: Passport[] = await this.passportRepo.getAll();
        return userlist;
    }
    async getNextPassport(): Promise<Passport> {
        let userlist: Passport[] = await this.passportRepo.getUnselected();
        if (isEmptyObject(userlist)) {
            throw new ResourceNotFoundError();
        }
        let nextPassportId: Passport = userlist[Math.floor(Math.random() * userlist.length)];
        let nextPassport: Passport = { ...await this.passportRepo.getById(nextPassportId.id) };
        if (isEmptyObject(nextPassport)) {
            throw new ResourceNotFoundError();
        }
        //mark the passport as selected
        await this.passportRepo.updateSelected(nextPassportId.id);
        if (isEmptyObject(nextPassport)) {
            throw new ResourceNotFoundError();
        }
        return nextPassport;
    }
    async getExclusionGrouplist(name: string): Promise<number[]> {
        let passport = await this.passportRepo.getPassportInGroup(name);
        let passportList: number[];
        passport.forEach(element => {
            passportList.push(element.id);
        });
        return passportList;
    }
    async checkIfInGroup(passport: Passport, name: string): Promise<Boolean> {
        if (isEmptyObject(passport) || !isString(name)) {
            throw new BadRequestError();
        }
        let idList: number[] = await this.getExclusionGrouplist(name);
        if (isEmptyObject(idList)) {
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
