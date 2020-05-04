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
    async getAllEvents(): Promise<DailyEvent[]> {
        let eventlist: DailyEvent[] = await this.dailyEventuserRepo.getAll();
        if (isEmptyObject(eventlist)) {
            throw new ResourceNotFoundError;
        }
        return eventlist;
    }
    async getNextEvent(): Promise<DailyEvent> {
        let events: DailyEvent[] = await this.dailyEventuserRepo.getUnselected();
        events = shuffle(events);
        let nextPassport: DailyEvent = await this.dailyEventuserRepo.getById(event[0]);
        if (isEmptyObject(nextPassport)) {
            throw new ResourceNotFoundError();
        } else {
            await this.dailyEventuserRepo.updateSelected(nextPassport.id);
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