export class DailyEvent {

    id: number;
    title: string;
    content: string;
    groupId: number;
    selected: boolean;

    constructor (id: number, title: string, content: string, groupId: number, selected:boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.groupId = groupId;
        this.selected = selected;
    }
    
}