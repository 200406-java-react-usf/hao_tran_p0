export class Principal {

    id: number;
    username: string;
    score: number;
    role: string;

    constructor(id: number, username: string, score:number, role: string) {
        this.id = id;
        this.username = username;
        this.score = score;
        this.role = role;
    }
    
}