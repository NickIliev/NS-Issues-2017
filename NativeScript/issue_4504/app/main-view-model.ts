import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _myItems: Array<any>;

    constructor() {
        super();

        // Initialize default values.
        this.myItems = [{ age: 34 }, { age: 25 }, {}, { age: 37 }];
    }

    get myItems(): Array<any> {
        return this._myItems;
    }

    set myItems(value: Array<any>) {
        if (this._myItems !== value) {
            this._myItems = value;
            this.notifyPropertyChange('myItems', value)
        }
    }

}