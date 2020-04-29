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


export class DailyEventService {
    getNextPassport(): Promise<DailyEvent> {
        return new Promise<DailyEvent>(async (resolve, reject) => {

            let userlist:[Number] = {...await this.passportRepo.getUnselected()};
            let nextPassportId:Number = userlist[Math.floor(Math.random() * userlist.length)];
            let nextPassport: DailyEvent = {...await this.passportRepo.getById(nextPassportId)};
            // if (isEmptyObject(user)) {
            //     return reject(new ResourceNotFoundError());
            // }
            resolve(nextPassport);
        });
    }
    constructor(private passportRepo: DailyEventRepository) {
        this.passportRepo = passportRepo;
    }

}