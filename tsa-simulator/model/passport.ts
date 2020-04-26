  
export class Passport {

    id: number;
    firstName: string;
    lastName: string;
    nationality: string;

    constructor (id: number, firstName: string, lastName: string, nationality: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationality = nationality;
    }
    
}