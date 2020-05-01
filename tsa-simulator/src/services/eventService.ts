import { DailyEventRepository } from "../repos/dailyEvent-repo";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
} from "../errors/errors";
import { DailyEvent } from "../models/dailyEvent";
import { Passport } from "../models/passport";
import {    
    ValidId, 
    isEmptyObject,
    shuffle 
} from "../util/tools"



export class DailyEventService {
    constructor(private dailyEventuserRepo: DailyEventRepository) {
        this.dailyEventuserRepo = dailyEventuserRepo;
    }
    getUselectedEventList(): Promise<[number]> {
        return new Promise<[number]>(async (resolve, reject) => {
            let userlist:[number] = {...await this.dailyEventuserRepo.getUnselected()};
            if (isEmptyObject(userlist)){
                reject(new ResourceNotFoundError);
            }
            userlist = shuffle(userlist);
            resolve(userlist);         
        });
    }
    getNextEvent(id:number): Promise<DailyEvent> {
        return new Promise<DailyEvent>(async (resolve, reject) => {
            if (!ValidId(id)){
                return new BadRequestError;
            }
            let nextPassport: DailyEvent = {...await this.dailyEventuserRepo.getById(id)};
            if (isEmptyObject(nextPassport)){
                return reject(new ResourceNotFoundError);
            }else{
                resolve(nextPassport);
            }
        });
    }
    getExclusionGroup(id:number): Promise<[number]> {
        return new Promise<[number]>(async (resolve, reject) => {
            if (!ValidId(id)){
                return reject(new BadRequestError);
            }
            let group:[number] = {...await this.dailyEventuserRepo.getGroupById(id)};
            resolve(group);
        });
    }
    checkIfInGroup(passport:Passport, id:number): Promise<Boolean>{
        return new Promise<Boolean>(async (resolve, reject) => {
            if (isEmptyObject(passport)||!ValidId(id)){
                return reject(new BadRequestError);
            }
            let idList:[number] = {...await this.getExclusionGroup(id)};
            if (isEmptyObject(idList)){
                return reject(new BadRequestError);
            }
            let result:Boolean=idList.includes(passport.id);
            resolve(result);
        });
    }
}