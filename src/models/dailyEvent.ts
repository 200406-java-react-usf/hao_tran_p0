export class DailyEvent {

    id: number;
    title: string;
    content: string;
    groupname: string;
    selected: boolean;

    constructor (id: number, title: string, content: string, groupname: string, selected:boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.groupname = groupname;
        this.selected = selected;
    }
    
}