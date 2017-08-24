import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {


    private _source: Array<any>;

    constructor() {
        super();

        this.source = ["ala"];
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