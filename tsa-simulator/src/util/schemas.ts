export interface UserSchema {
    id: number,
    username: string,
    password: string,
    score: number,
    role: string
}

export interface PassportSchema {
    id: number;
    firstName: string;
    lastName: string;
    nationality: string;
    occupation: string;
    race: string;
    religion: string;
    culture: string;
    property: number;
    selected: boolean;
}

export interface DailyEventSchema {
    id: number;
    title: string;
    content: string;
    groupId: number;
    selected: boolean;
}