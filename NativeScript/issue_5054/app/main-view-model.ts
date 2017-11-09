import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    public items: Array<any>;
    public message: string;
    public anotherMessage: string;

    constructor() {
        super();

        this.message = "Parent binding message";
        this.anotherMessage = "another message";
        this.items = [1, 1, 2, 3, 5, 8, 13, 21, 34, 1, 2, 3, 5, 8, 13, 21, 34];
    }
}