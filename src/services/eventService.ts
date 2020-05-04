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
    async getEvents(): Promise<DailyEvent[]> {
        let eventlist: DailyEvent[] = await this.dailyEventuserRepo.getAll();
        console.log(eventlist);
        if (isEmptyObject(eventlist)) {
            throw new ResourceNotFoundError;
        }
        return eventlist;
    }
    async getNextEvent(): Promise<DailyEvent> {
        let events: DailyEvent[] = await this.dailyEventuserRepo.getUnselected();
        events = shuffle(events);
        let nextEvent: DailyEvent = events[0];
        if (isEmptyObject(nextEvent)) {
            throw new ResourceNotFoundError();
        } else {
            await this.dailyEventuserRepo.updateSelected(nextEvent.id);
            return nextEvent;
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