export class DailyEvent {

    id: number;
    title: string;
    content: string;
    group: number;
    selected: boolean;

    constructor (id: number, title: string, content: string, group: number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.group = group;
        this.selected = false;
    }
    
}