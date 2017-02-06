import { Observable } from 'data/observable';
import * as httpModule from "http";

export class HelloWorldModel extends Observable {

    public items: Array<any> = [];
    public items2: Array<any> = [];
    constructor() {
        super();

        this.items = [1111, 2222, 3333, 4444, 5555, 6666, 7777];

        this.items2 = ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg"];

    }
}