  
export class Passport {

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

    constructor (
            id: number,   
            firstname: string,  
            lastname: string, 
            origin: string,
            occupation: string,
            race: string,
            religion: string,
            culture: string,
            property: number,
            selected: boolean
        ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.origin = origin;
        this.occupation = occupation;
        this.race = race;
        this.religion = religion;
        this.culture = culture;
        this.property = property;
        this.selected = selected;
    }
    
}