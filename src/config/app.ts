import { UserRepository } from "../repos/user-repo";
import { UserService } from "../services/userService";
import { PassportRepository } from "../repos/passport-repo";
import { PassportService } from "../services/passportService";
import { DailyEventRepository } from "../repos/dailyEvent-repo";
import { DailyEventService } from "../services/eventService";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

const passportRepo = new PassportRepository();
const passportService = new PassportService(passportRepo);

const eventRepo = new DailyEventRepository();
const eventService = new DailyEventService(eventRepo);

export default {
    userService,
    passportService,
    eventService,
    passportRepo,
    eventRepo,
}