export interface UserSchema {
    id: number,
    username: string,
    password: string,
    score: number,
    role: string
}

export interface PassportSchema {
    id: number;
    firstname: string;
    lastname: string;
    origin: string;
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
    groupname: string;
    selected: boolean;
}