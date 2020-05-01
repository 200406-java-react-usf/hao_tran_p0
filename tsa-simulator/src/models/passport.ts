  
export class Passport {

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

    constructor (
            id: number,   
            firstName: string,  
            lastName: string, 
            nationality: string,
            occupation: string,
            race: string,
            religion: string,
            culture: string,
            property: number,
            selected: boolean
        ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationality = nationality;
        this.occupation = occupation;
        this.race = race;
        this.nationality = nationality;
        this.religion = religion;
        this.culture = culture;
        this.property = property;
        this.selected = selected;
    }
    
}