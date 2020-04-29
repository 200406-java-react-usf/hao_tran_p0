export class Event {

    id: number;
    title: string;
    content: string;
    group: Number;
    selected: boolean;

    constructor (id: number, title: string, content: string, group: Number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.group = group;
        this.selected = false;
    }
    
}