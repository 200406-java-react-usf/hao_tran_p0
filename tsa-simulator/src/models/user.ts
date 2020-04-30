export class User {

    id: number;
    username: string;
    password: string;
    score: number;
    role: string;


    constructor(id: number, username: string, password: string, score: number, role: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.score = score;
        this.role = role;
    }

}