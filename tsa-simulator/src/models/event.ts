export class DailyEvent {

    id: number;
    title: string;
    content: string;
    group: Number;

    constructor (id: number, title: string, content: string, group: Number) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.group = group;
    }
    
}