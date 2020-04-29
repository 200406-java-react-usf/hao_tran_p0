export class DailyEvent {

    id: number;
    title: string;
    content: string;
    criteria: string;

    constructor (id: number, title: string, content: string, criteria: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.criteria = criteria;
    }
    
}