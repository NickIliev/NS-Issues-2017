import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {


    private _source: Array<any>;

    constructor() {
        super();

        this.source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }

    get source(): Array<any> {
        return this._source;
    }

    set source(value: Array<any>) {
        if (this._source !== value) {
            this._source = value;
            this.notifyPropertyChange('messourcesage', value)
        }
    }

    public onTap() {
        console.log("TAP");
    }


}