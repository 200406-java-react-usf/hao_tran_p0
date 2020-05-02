import { 
    UserSchema,
    PassportSchema,
    DailyEventSchema,
 } from "./schemas";
import { User } from "../models/user";
import { Passport } from "../models/passport";
import { DailyEvent } from "../models/dailyEvent";

export function mapUserResult(resultSet: UserSchema): User {
    
    if (!resultSet) {
        return {} as User;
    }

    return new User(
        resultSet.id,
        resultSet.username,
        resultSet.password,
        resultSet.score,
        resultSet.role
    );
}

export function mapPassportResult(resultSet: PassportSchema): Passport {
    if (!resultSet) {
        return {} as Passport;
    }
    return new Passport(
        resultSet.id,   
        resultSet.firstName,  
        resultSet.lastName, 
        resultSet.nationality,
        resultSet.occupation,
        resultSet.race,
        resultSet.religion,
        resultSet.culture,
        resultSet.property,
        resultSet.selected
    );
}

export function mapEventResult(resultSet:DailyEventSchema): DailyEvent {
    
    if (!resultSet) {
        return {} as DailyEvent;
    }

    return new DailyEvent(
        resultSet.id,
        resultSet.title,
        resultSet.content,
        resultSet.groupId,
        resultSet.selected
    );
}