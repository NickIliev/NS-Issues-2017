import { EventData } from 'data/observable';
import { Page } from 'ui/page';

export function navigatingTo(args: EventData) {
    var testInstance = new Test();
    console.log(testInstance.typeName);
}


import { Observable } from "data/observable";

class Test extends Observable {
    public foo: string;
    public bar: boolean;

    constructor() {
        super();
        this.foo = "bar";
        this.bar = true;
    }
};
