export class Group {
    
    id: number;
    groupName: string;
    memberId: [number];

    constructor (id: number, groupName: string, memberId: [number]) {
        this.id = id;
        this.groupName = groupName;
        this.memberId = memberId;
    }
}