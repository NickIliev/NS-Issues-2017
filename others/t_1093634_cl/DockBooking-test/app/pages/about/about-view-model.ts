import {Observable} from 'data/observable';

export class AboutModel extends Observable {

    private _counter: number;
    private _message: string;

    constructor() {
        super();

        // Initialize default values.
        this.set('pageTitle', 'about');
    }

}
