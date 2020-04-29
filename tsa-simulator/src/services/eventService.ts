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

            let userlist:[Number] = {...await this.dailyEventuserRepo.getUnselected()};
            let nextPassportId:Number = userlist[Math.floor(Math.random() * userlist.length)];
            let nextPassport: DailyEvent = {...await this.dailyEventuserRepo.getById(nextPassportId)};

            resolve(nextPassport);
        });
    }
    getExclusionGroup(id:Number): Promise<[Number]> {
        return new Promise<[Number]>(async (resolve, reject) => {
            let group:[Number] = {...await this.dailyEventuserRepo.getGroupById(id)};

            resolve(group);
        });
    }
    checkIfInGroup(passport:Passport, id:Number): Promise<Boolean>{
        return new Promise<Boolean>(async (resolve, reject) => {
            let idList:[Number] = {...await this.getExclusionGroup(id)};
            let result:Boolean=idList.includes(passport.id);
            resolve(result);
        });
    }
}