import { Observable } from 'data/observable';


export class TestModel extends Observable {

    private myItems = [];
    private router = require('ui/frame').topmost();

    constructor() {
        super();

        for (let i = 0; i < 100; i++) {
            this.myItems.push("TEST" + i);
        }
    }

    public openPage() {

        // Navigate in the page Main.
        this.router.navigate({
            moduleName: "page/test/test-page",
        });
    }
}