export class User {

    id: number;
    username: string;
    password: string;
    score: number;


    constructor(id: number, username: string, password: string, score: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.score = score;
    }

}