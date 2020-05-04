import { DailyEventRepository } from "../repos/dailyEvent-repo";
import {
    BadRequestError,
    ResourceNotFoundError,
    ResourcePersistenceError
} from "../errors/errors";
import { DailyEvent } from "../models/dailyEvent";
import {
    ValidId,
    isEmptyObject
} from "../util/tools"



export class DailyEventService {
    constructor(private dailyEventRepo: DailyEventRepository) {
        this.dailyEventRepo = dailyEventRepo;
    }
    async getEvents(): Promise<DailyEvent[]> {
        let eventlist: DailyEvent[] = await this.dailyEventRepo.getAll();
        if (isEmptyObject(eventlist)) {
            throw new ResourceNotFoundError;
        }
        return eventlist;
    }
    async getNextEvent(): Promise<DailyEvent> {
        let eventlist: DailyEvent[] = await this.dailyEventRepo.listUnselected();
        let randomIndex = Math.floor(Math.random() * eventlist.length)
        let nextEvent: DailyEvent = eventlist[randomIndex];
        
        if (isEmptyObject(nextEvent)||!nextEvent) {
            throw new ResourceNotFoundError();
        } else {
            await this.dailyEventRepo.updateSelected(nextEvent.id);
            return nextEvent;
        }
    }
    async resetEventList(): Promise<boolean> {
        let taskCheck = await this.dailyEventRepo.resetEvent();
        if (taskCheck) {
            return true;
        } else {
            throw new ResourceNotFoundError();
        }
    }
}