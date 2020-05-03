export class DailyEvent {

    id: number;
    title: string;
    content: string;
    group: string;
    selected: boolean;

    constructor (id: number, title: string, content: string, group: string, selected:boolean) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.group = group;
        this.selected = selected;
    }
    
}