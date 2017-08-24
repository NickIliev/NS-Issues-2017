import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {


    private _source: Array<any>;

    constructor() {
        super();

        // Initialize default values.
        this.source = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 6, 7];

    }

    get source(): Array<any> {
        return this._source;
    }

    set source(value: Array<any>) {
        if (this._source !== value) {
            this._source = value;
            this.notifyPropertyChange('source', value)
        }
    }
}