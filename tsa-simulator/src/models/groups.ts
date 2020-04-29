export class Group {
    
    id: number;
    groupName: string;
    memberId: [Number];

    constructor (id: number, groupName: string, memberId: [Number]) {
        this.id = id;
        this.groupName = groupName;
        this.memberId = memberId;
    }
}