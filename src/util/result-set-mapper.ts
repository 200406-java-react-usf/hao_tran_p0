import { 
    UserSchema,
    PassportSchema,
    DailyEventSchema,
 } from "./schemas";
import { User } from "../models/user";
import { Passport } from "../models/passport";
import { DailyEvent } from "../models/dailyEvent";

export function mapEventResultSet(resultSet:DailyEventSchema): DailyEvent {
    
    if (!resultSet) {
        return {} as DailyEvent;
    }

    return new DailyEvent(
        resultSet.id,
        resultSet.title,
        resultSet.content,
        resultSet.groupname,
        resultSet.selected
    );
}

export function mapUserResultSet(resultSet: UserSchema): User {
    
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

export function mapPassportResultSet(resultSet: PassportSchema): Passport {
    if (!resultSet) {
        return {} as Passport;
    }
    return new Passport(
        resultSet.id,   
        resultSet.firstname,  
        resultSet.lastname, 
        resultSet.origin,
        resultSet.occupation,
        resultSet.race,
        resultSet.religion,
        resultSet.culture,
        resultSet.property,
        resultSet.selected
    );
}

