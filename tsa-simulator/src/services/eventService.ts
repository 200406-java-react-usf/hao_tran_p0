import { DailyEventRepository } from "../repos/dailyEvent-repo";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    ResourcePersistenceError
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
    async getUselectedEventList(): Promise<DailyEvent[]> {
            let eventlist:DailyEvent[] = await this.dailyEventuserRepo.getUnselected();
            if (isEmptyObject(eventlist)){
                throw new ResourceNotFoundError;
            }
            eventlist = shuffle(eventlist);
            return eventlist;         
    }
    async getNextEvent(id:number): Promise<DailyEvent> {
            if (!ValidId(id)){
                throw new BadRequestError();
            }
            let nextPassport: DailyEvent = await this.dailyEventuserRepo.getById(id);
            if (isEmptyObject(nextPassport)){
                throw new ResourceNotFoundError();
            }else{
                return nextPassport;
            }
    }
    async resetEventList(): Promise<boolean> {
            let taskCheck = await this.dailyEventuserRepo.resetEvent();
            if (taskCheck) {
                return true;
            } else {
                throw new ResourcePersistenceError();
            }        
    }
}