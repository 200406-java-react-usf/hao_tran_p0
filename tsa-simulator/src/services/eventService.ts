import { DailyEventRepository } from "../repos/dailyEvent-repo";
// import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from "../util/validator";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";
import { DailyEvent } from "../models/dailyEvent";
import { Passport } from "../models/passport";



export class DailyEventService {
    constructor(private dailyEventuserRepo: DailyEventRepository) {
        this.dailyEventuserRepo = dailyEventuserRepo;
    }
    getNextEvent(): Promise<DailyEvent> {
        return new Promise<DailyEvent>(async (resolve, reject) => {

            let userlist:[number] = {...await this.dailyEventuserRepo.getUnselected()};
            let nextEventId:number = userlist[Math.floor(Math.random() * userlist.length)];
            let nextPassport: DailyEvent = {...await this.dailyEventuserRepo.getById(nextEventId)};

            resolve(nextPassport);
        });
    }
    getExclusionGroup(id:number): Promise<[number]> {
        return new Promise<[number]>(async (resolve, reject) => {
            let group:[number] = {...await this.dailyEventuserRepo.getGroupById(id)};

            resolve(group);
        });
    }
    checkIfInGroup(passport:Passport, id:number): Promise<Boolean>{
        return new Promise<Boolean>(async (resolve, reject) => {
            let idList:[number] = {...await this.getExclusionGroup(id)};
            let result:Boolean=idList.includes(passport.id);
            resolve(result);
        });
    }
}