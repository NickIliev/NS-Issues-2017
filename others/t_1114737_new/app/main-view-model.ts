import { Observable, fromObject } from 'data/observable';


class Item extends Observable {

    constructor(public text: string, public isItemVisible: boolean) { 
        super();
    }

    public toggleVisibility(args) {
        console.dir(this);
        console.log(args.object);
        console.log("toggleVisibility value: " + this.isItemVisible);

        this.set("isItemVisible", !this.isItemVisible);
    }
}

export class HelloWorldModel extends Observable {

    public items: Array<any>;

    constructor() {
        super();

        this.items = [
            new Item("1", true),
            new Item("2", true),
            new Item("3", true),
            new Item("4", true),
        ]
    }
}