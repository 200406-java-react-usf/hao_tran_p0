export class User {

    id: number;
    username: string;
    userpassword: string;
    score: number;
    userrole: string;


    constructor(id: number, username: string, userpassword: string, score: number, userrole: string) {
        this.id = id;
        this.username = username;
        this.userpassword = userpassword;
        this.score = score;
        this.userrole = userrole;
    }

}