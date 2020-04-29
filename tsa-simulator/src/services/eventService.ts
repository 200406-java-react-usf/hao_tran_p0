import { EventRepository } from "../repos/event-repo";
// import { isValidId, isValidStrings, isValidObject, isPropertyOf, isEmptyObject } from "../util/validator";
import { 
    BadRequestError, 
    ResourceNotFoundError, 
    NotImplementedError, 
    ResourcePersistenceError, 
    AuthenticationError 
} from "../errors/errors";
import { Passport } from "../models/passport";


export class EventService {
    constructor(private passportRepo: EventRepository) {
        this.passportRepo = passportRepo;
    }

}